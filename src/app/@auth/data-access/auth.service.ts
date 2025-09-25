import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { CacheService } from './cache.service';
import { AuthCredentials, AuthResponse } from '../types/auth-types';
import { NotificationService } from '../../@core/service/notification.service';
import { User } from '../../@shared/types/user-model';
import { jwtDecode } from 'jwt-decode';
import { buildApiPath } from '../../@core/util/api-paths';
import { AUTH_KEYS } from '../../@shared/constants/auth.keys';
import Encryptor from '../../@core/util/auth-crypto';
import { AuthMockService } from './auth-mock.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends CacheService {
  private readonly LOGIN_URL = buildApiPath('book-api/login');
  

  private readonly USE_MOCK_API = true;

  private readonly _httpMessenger = inject(HttpClient);
  private readonly _router = inject(Router);
  private readonly authMockService = inject(AuthMockService);
  private readonly notificationSrv = inject(NotificationService);

  constructor() {
    super();
  }

login(credentials: AuthCredentials): Observable<AuthResponse> {
    if (this.USE_MOCK_API) {
      return this.authMockService.login(credentials).pipe(
        map((mockResponse) => ({
          content: {
            user: mockResponse.user,
            token: mockResponse.token
          },
          error: null,
          hasError: false,
          errorMessage: '',
          message: mockResponse.responseDecription || 'Login successful',
          isSuccess: true
        } as AuthResponse))
      );
    } else {
      const payload: AuthCredentials = {
        userID: credentials.userID,
        password: credentials.password,
      };
      
      const encryptedPayload = Encryptor.encryptCredential({ ...payload });
      
      return this._httpMessenger.post<AuthResponse>(this.LOGIN_URL, encryptedPayload);
    }
  }

 initializeCurrentUserFromToken(): { user: User | null; token: string | null; isAuthenticated: boolean } {
    const token = this.getAccessToken();

    if (token) {
      try {
        const user = this.decodeJWT(token);
        return {
          user,
          token,
          isAuthenticated: true
        };
      } catch (error) {
        console.error('Invalid token detected:', error);
        this.clearSession();
        return {
          user: null,
          token: null,
          isAuthenticated: false
        };
      }
    }

    return {
      user: null,
      token: null,
      isAuthenticated: false
    };
  }

  decodeJWT(token: string): User | null {
    if (this.USE_MOCK_API) {
      return this.getItem(AUTH_KEYS.USER);
    }
    try {
      return jwtDecode<User>(token);
    } catch (error) {
      console.error('Failed to decode JWT token:', error);
      return null;
    }
  }
  

  cacheAuthData(user: User, token: string): void {
    this.setItem(AUTH_KEYS.USER, user);
    this.setItem(AUTH_KEYS.JWT, token);
  }

 
  getCurrentUser(): User | null {
    return this.getItem(AUTH_KEYS.USER);
  }

 
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
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
  }

 
  logout(): void {
    this.clearSession();
    this._router.navigate(['/auth/login']);
  }

  getRedirectPathByRole(userRole: string): string {
    const roleRoutes: { [key: string]: string } = {
      'Admin': '/admin/dashboard',
      'User': '/user/dashboard',
      'Manager': '/manager/dashboard',
    };

    return roleRoutes[userRole] || '/dashboard';
  }

  
  hasValidToken(): boolean {
    const token = this.getAccessToken();
    return !!token;
  }

 
  updateUserProfile(user: User): void {
    this.setItem(AUTH_KEYS.USER, user);
  }

  
  refreshToken(): Observable<string> {
    // TODO: Implement when refresh token logic is needed
    return throwError(() => new Error('Refresh token not implemented'));
  }
}