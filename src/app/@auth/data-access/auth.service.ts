import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { CacheService } from './cache.service';
import { AuthCredentials, AuthResponse } from '../types/auth-types';
import { LoadingService } from '../../@core/services/loading.service';
import { NotificationService } from '../../@core/service/notification.service';
import { User } from '../../@shared/types/user-model';
import { jwtDecode } from 'jwt-decode';
import { buildApiPath } from '../../@core/util/api-paths';
import { AUTH_KEYS } from '../../@shared/constants/auth.keys';
import Encryptor from '../../@core/util/auth-crypto';
import { Store } from '@ngxs/store';
import { AuthActions } from '../state';
import { AuthState } from '../state/auth.state';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends CacheService {
  private readonly LOGIN_URL = buildApiPath('book-api/login');

  private readonly _httpMessenger = inject(HttpClient);
  private readonly _router = inject(Router);
  private readonly _store = inject(Store);

  loadingSrv = inject(LoadingService);
  notificationSrv = inject(NotificationService);

  // Keep these for backward compatibility, but they now come from store
  public get currentUser$(): Observable<User | null> {
    return this._store.select(AuthState.user);
  }

  public get isAuthenticated$(): Observable<boolean> {
    return this._store.select(AuthState.isAuthenticated);
  }

  constructor() {
    super();
    this.initializeCurrentUserFromToken();
  }

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    // Dispatch login action to clear any previous errors
    this._store.dispatch(new AuthActions.Login(credentials));

    let payload: AuthCredentials = {
      userID: credentials.userID,
      password: credentials.password,
    };
    
    const encryptedPayload = Encryptor.encryptCredential({ ...payload });
    
    return this._httpMessenger.post<AuthResponse>(this.LOGIN_URL, encryptedPayload).pipe(
      tap((response: AuthResponse) => {
        // On successful login
        if (response.token) {
          // Store token in cache
          this.setAccessToken(response.token);
          
          // Decode user from token
          const user = this.decodeJWT(response.token);
          
          // Store user in cache
          this.setUser(user);
          
          // Update NGXS state
          this._store.dispatch(new AuthActions.LoginSuccess({
            user: user,
            token: response.token
          }));
        }
      }),
      catchError((error) => {
        // On login failure, dispatch failure action
        this._store.dispatch(new AuthActions.LoginFailure(error));
        return throwError(() => error);
      })
    );
  }

  initializeCurrentUserFromToken(): void {
    // Dispatch action to check auth status
    this._store.dispatch(new AuthActions.CheckAuthStatus());
    
    const token = this.getAccessToken();

    if (token) {
      try {
        const user = this.decodeJWT(token);
        
        // Set auth data in store
        this._store.dispatch(new AuthActions.SetAuthData({
          user: user,
          token: token
        }));
      } catch (error) {
        console.error('Invalid token detected:', error);
        this.logout();
      }
    } else {
      // Clear auth data if no token
      this._store.dispatch(new AuthActions.ClearAuthData());
    }
  }

  decodeJWT(token: string): User {
    return jwtDecode<User>(token);
  }

  setCurrentUser(user: User | null): void {
    // Update both cache and store
    if (user) {
      this.setUser(user);
      // Get current token from store or cache
      const currentToken = this._store.selectSnapshot(AuthState.token) || this.getAccessToken();
      if (currentToken) {
        this._store.dispatch(new AuthActions.SetAuthData({
          user: user,
          token: currentToken
        }));
      } else {
        this._store.dispatch(new AuthActions.UpdateUserProfile(user));
      }
    } else {
      this._store.dispatch(new AuthActions.ClearAuthData());
    }
  }

  getCurrentUser(): User | null {
    // Get current user from store
    return this._store.selectSnapshot(AuthState.user);
  }

  setUser(user: User): void {
    this.setItem(AUTH_KEYS.USER, user);
    // Also update store
    this._store.dispatch(new AuthActions.UpdateUserProfile(user));
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
    // Clear cache first
    this.clearCache();
    
    // Then clear NGXS state
    this._store.dispatch(new AuthActions.ClearAuthData());
  }

  logout(): void {
    // Dispatch logout action
    this._store.dispatch(new AuthActions.Logout());
    
    // Clear session
    this.clearSession();
    
    // Dispatch logout success
    this._store.dispatch(new AuthActions.LogoutSuccess());
    
    // Navigate to login
    this._router.navigate(['/auth/login']);
  }

  getRedirectPathByRole(userRole: string): string {
    // TODO: TO BE IMPLEMENTED LATER
    return '';
  }

  // Additional helper methods for NGXS integration
  
  /**
   * Refresh token (if you implement refresh token logic later)
   */
  refreshToken(): Observable<any> {
    this._store.dispatch(new AuthActions.RefreshToken());
    // TODO: Implement refresh token logic
    // Return HTTP call and dispatch RefreshTokenSuccess/Failure
    return throwError(() => new Error('Refresh token not implemented'));
  }

  /**
   * Check if user is currently authenticated (synchronous)
   */
  isAuthenticated(): boolean {
    return this._store.selectSnapshot(AuthState.isAuthenticated);
  }

  /**
   * Get current auth error (if any)
   */
  getAuthError(): any {
    return this._store.selectSnapshot(AuthState.error);
  }

  /**
   * Clear auth errors
   */
  clearAuthError(): void {
    // You could add a ClearError action if needed
  }
}