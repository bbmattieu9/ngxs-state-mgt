import { Component, OnInit, inject} from '@angular/core';
import { LoginComponent } from '../components/login.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../@core/services/loading.service';
import { Router } from '@angular/router';

import { catchError, EMPTY, filter, finalize, Observable, of, Subject, switchMap, take, tap } from 'rxjs';
import { NotificationService } from '../../@core/service/notification.service';
import { AuthService } from '../data-access/auth.service';

interface AuthCredentials {

}

@Component({
  selector: 'app-login-page',
  imports: [LoginComponent],
  template: `
    <app-login
      [loginForm]="loginForm"
      [loggingIn]="loggingIn"
      (onTriggerLogin)="handleLogin($event)"
    >
    </app-login>
  `,
  styles: ``
})
export class LoginPageComponent implements OnInit{

  private readonly fb = inject(FormBuilder)
  private readonly loadingSrv = inject(LoadingService)
  private readonly router = inject(Router);
  private readonly authSrv = inject(AuthService);
  private readonly notificationSrv = inject(NotificationService);

  loggingIn = false;
  loginForm!: FormGroup;
  destroy$ = new Subject<void>();
 
  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      userID: ['', Validators.required],
      countryCode: ['', Validators.required],
      password: [''],
      piN_OTP: [''],
    });
  }



private loginFlow$(
  credentials: AuthCredentials,
  authMode: 'password' | 'piN_OTP'): Observable<any> {
  return this.authSrv.login(credentials, authMode).pipe(
    tap((res) => {
      console.log('[ __Auth Response__ ]:', res);
      const token = res?.content.token;
      this.authSrv.setAccessToken(token);
      this.authSrv.setUser(res?.content.user);
      this.authSrv.setCurrentUser(res?.content.user);
    }),
    switchMap(() => this.authSrv.isAuthenticated$),
    filter(isAuthenticated => isAuthenticated),
    take(1), 
    tap(() => {
      const user = this.authSrv.getCurrentUser();
      if (user) {
        const userRole = user.role;
        const redirectPath = this.authSrv.getRedirectPathByRole(userRole);
        console.log('[  __RedirectPath__ ]:', redirectPath);
        this.router.navigateByUrl(redirectPath);
      }
    }));
}

handleLogin(authMode: 'password' | 'piN_OTP'): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    const raw = this.loginForm.getRawValue();
    
    const credentials: AuthCredentials =
      authMode === 'password'
        ? { userID: raw.userID, password: raw.password, countryCode: raw.countryCode }
        : { userID: raw.userID, piN_OTP: raw.piN_OTP, countryCode: raw.countryCode };
    of(credentials)
      .pipe(
        tap(() => this.loadingSrv.loadingOn()),
        switchMap((creds) => this.loginFlow$(creds, authMode)),
        catchError((err) => {
          console.error('[__Login Error__]:', err);
          this.notificationSrv.customErrorNotifiction(
            `Login Failed - ${
              err?.error?.message || err.message || 'Unknown error'
            }`
          );
          return EMPTY;
        }),
        finalize(() => this.loadingSrv.loadingOff())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
 