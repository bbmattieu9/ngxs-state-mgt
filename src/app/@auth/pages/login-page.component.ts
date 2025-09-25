import { Component, OnInit, inject} from '@angular/core';
import { LoginComponent } from '../components/login.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../@core/services/loading.service';
import { Router } from '@angular/router';

import { catchError, combineLatest, EMPTY, filter, finalize, Observable, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { NotificationService } from '../../@core/service/notification.service';
import { AuthService } from '../data-access/auth.service';
import { AuthState } from '../state/auth.state';
import { Store } from '@ngxs/store';
import { AuthCredentials } from '../types/auth-types';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { AsyncPipe } from '@angular/common';
import { AuthActions } from '../state/auth.actions';




@Component({
  selector: 'app-login-page',
  imports: [LoginComponent, AsyncPipe],
  template: `
    <app-login
      [loginForm]="loginForm"
      [loggingIn]="(loggingIn$ | async) || false"
      (onTriggerLogin)="handleLogin()"
    >
    </app-login>
  `,
  styles: ``
})
export class LoginPageComponent implements OnInit{

  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder)
  private readonly loadingSrv = inject(LoadingService)
  private readonly router = inject(Router);
  private readonly authSrv = inject(AuthService);
  private readonly notificationSrv = inject(NotificationService);


  loggingIn$: Observable<boolean> = this.store.select(AuthState.loading);
  isAuthenticated$: Observable<boolean> = this.store.select(AuthState.isAuthenticated);
  error$: Observable<any> = this.store.select(AuthState.error);
  user$ = this.store.select(AuthState.user);

  
  loginForm!: FormGroup;
  destroy$ = new Subject<void>();
 
  ngOnInit(): void {
    this.initForm();
    // this.setupAuthSubscriptions();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      userID: ['', Validators.required],
      password: [''],
    });
  }

   private setupAuthSubscriptions(): void {
    // Listen for successful authentication and redirect
    combineLatest([
      this.isAuthenticated$,
      this.user$
    ]).pipe(
      takeUntil(this.destroy$),
      filter(([isAuthenticated, user]) => isAuthenticated && !!user),
      tap(([_, user]) => {
        if (user) {
          const redirectPath = this.authSrv.getRedirectPathByRole(user.role);
          console.log('[ __NgXS RedirectPath__ ]:', redirectPath);
          this.router.navigateByUrl(redirectPath);
        }
      })
    ).subscribe();

    // Listen for errors and show notifications
    this.error$.pipe(
      takeUntil(this.destroy$),
      filter(error => !!error),
      tap(error => {
        console.error('[ __NgXS Login Error__ ]:', error);
        this.notificationSrv.customErrorNotifiction(
          `Login Failed - ${error?.message || 'Unknown error'}`
        );
      })
    ).subscribe();
  }


// private loginFlow$(
//   credentials: AuthCredentials): Observable<any> {
//   return this.authSrv.login(credentials).pipe(
//     tap((res) => {
//       console.log('[ __Auth Response__ ]:', res);
//       const token = res?.content.token;
//       this.authSrv.setAccessToken(token);
//       this.authSrv.cacheAndPatchUser(res?.content.user);
//       this.authSrv.setOrUpdateCurrentUser(res?.content.user);
//     }),
//     switchMap(() => this.authSrv.isAuthenticated$),
//     filter(isAuthenticated => isAuthenticated),
//     take(1), 
//     tap(() => {
//       const user = this.authSrv.getCurrentUser();
//       if (user) {
//         const userRole = user.role;
//         const redirectPath = this.authSrv.getRedirectPathByRole(userRole);
//         console.log('[  __RedirectPath__ ]:', redirectPath);
//         this.router.navigateByUrl(redirectPath);
//       }
//     }));
// }

// handleLogin(): void {
//     this.loginForm.markAllAsTouched();
//     if (this.loginForm.invalid) return;

//     const raw = this.loginForm.getRawValue();
    
//     const credentials: AuthCredentials=raw;
     
//     of(credentials)
//       .pipe(
//         tap(() => this.loadingSrv.loadingOn()),
//         switchMap((creds) => this.loginFlow$(creds)),
//         catchError((err) => {
//           console.error('[ __Login Error__ ]:', err);
//           this.notificationSrv.customErrorNotifiction(
//             `Login Failed - ${
//               err?.error?.message || err.message || 'Unknown error'
//             }`
//           );
//           return EMPTY;
//         }),
//         finalize(() => this.loadingSrv.loadingOff())
//       )
//       .subscribe();
//   }

handleLogin(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    const credentials: AuthCredentials = this.loginForm.getRawValue();
    
    // Dispatch login action to NgXS store
    this.store.dispatch(new AuthActions.Login({
      userID: credentials.userID,
      password: credentials.password
    }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
 