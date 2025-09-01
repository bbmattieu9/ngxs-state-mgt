import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  map,
  Observable,
} from 'rxjs';
import { CacheService } from './cache.service';


import { AuthCredentials, AuthResponse } from '../types/auth-types';
import { LoadingService } from '../../@core/services/loading.service';
import { NotificationService } from '../../@core/service/notification.service';
import { User } from '../../@shared/types/user-model';
import { jwtDecode } from 'jwt-decode';
import { buildApiPath } from '../../@core/util/api-paths';
import { environment } from '../../../environments/environmrnt';
import { AUTH_KEYS } from '../../@shared/constants/auth.keys';
import Encryptor from '../../@core/util/auth-crypto';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CacheService {
  private readonly LOGIN_URL = buildApiPath('book-api/login');

  private readonly _httpMessenger = inject(HttpClient);
  private readonly _router = inject(Router);

  loadingSrv = inject(LoadingService);
  notificationSrv = inject(NotificationService);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  public isAuthenticated$ = this.currentUser$.pipe(
    map((user) => !!user)
  );

  constructor() {
    super();
    this.initializeCurrentUserFromToken();
  }

  login(
    credentials: AuthCredentials,
    authMode: 'password' | 'piN_OTP'
  ): Observable<AuthResponse> {
    let payload: AuthCredentials;

    if (authMode === 'password') {
      payload = {
        userID: credentials.userID,
        password: credentials.password,
        applicationID: environment.APP_CREDENTIAL.APP_ID.toString(),
      };
    } else {
      payload = {
        userID: credentials.userID,
        piN_OTP: credentials.piN_OTP,
        applicationID: environment.APP_CREDENTIAL.APP_ID.toString(),
      };
    }

    const encryptedPayload = Encryptor.encryptCredential({ ...payload });

    return this._httpMessenger.post<AuthResponse>(this.LOGIN_URL, encryptedPayload);
  }

  initializeCurrentUserFromToken(): void {
    const token = this.getAccessToken();

    if (token) {
      try {
        const user = this.decodeJWT(token);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Invalid token detected:', error);
        this.logout();
      }
    }
  }

  decodeJWT(token: string): User {
    return jwtDecode<User>(token);
  }

  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUserSubject.value;
    return roles.includes(user?.role || '');
  }

  setAccessToken(token: string): void {
    this.setItem(AUTH_KEYS.JWT, token);
  }

  getAccessToken(): string | null {
    return this.getItem(AUTH_KEYS.JWT);
  }

  clearSession(): void {
    this.clearCache();
    this.setCurrentUser(null);
  }

  logout(): void {
    this.clearSession();
    this._router.navigate(['/auth/login']);
  }
}
