// auth.state.ts
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AuthActions } from './auth.actions';
import { AuthError } from '../types/auth-types';
import { User } from '../../@shared/types/user-model';
import { AuthMockService } from '../data-access/auth-mock.service';
import { catchError, finalize, tap, throwError } from 'rxjs';

export interface AuthStateModel {
  user: User | null;
  token: string | null;
  refreshToken?: string | null;
  isAuthenticated: boolean;
  error: AuthError | null;
  loading?: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    error: null,
    loading: false,
  },
})
@Injectable()
export class AuthState {
  constructor(private authMockService: AuthMockService) {}

  @Selector()
  static user(state: AuthStateModel): User | null {
    return state.user;
  }

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static loading(state: AuthStateModel): boolean {
    return state.loading || false;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.isAuthenticated;
  }

  @Selector()
  static error(state: AuthStateModel): any {
    return state.error;
  }

  @Selector()
  static userRoles(state: AuthStateModel): string {
    return state.user?.role || '';
  }

  @Selector()
  static userName(state: AuthStateModel): string {
    return state.user?.userName || '';
  }

  @Selector()
  static userEmail(state: AuthStateModel): string {
    return state.user?.email || '';
  }

  @Action(AuthActions.Login)
  login(ctx: StateContext<AuthStateModel>, action: AuthActions.Login) {
    ctx.patchState({
      error: null,
      loading: true,
    });

    return this.authMockService.login(action.credential).pipe(
      tap((response: any) => {
        ctx.dispatch(
          new AuthActions.LoginSuccess({
            user: response.user,
            token: response.token,
          })
        );
      }),
      catchError((error: any) => {
        ctx.dispatch(
          new AuthActions.LoginFailure({
            message: error.error.responseDescription,
          })
        );
        return throwError(() => error);
      }),
      finalize(() => {
        ctx.patchState({
          loading: false,
        });
      })
    );
  }

  @Action(AuthActions.LoginSuccess)
  loginSuccess(
    ctx: StateContext<AuthStateModel>,
    action: AuthActions.LoginSuccess
  ) {
    ctx.patchState({
      user: action.payload.user,
      token: action.payload.token,
      isAuthenticated: true,
      error: null,
    });
  }

  @Action(AuthActions.LoginFailure)
  loginFailure(
    ctx: StateContext<AuthStateModel>,
    action: AuthActions.LoginFailure
  ) {
    ctx.patchState({
      user: null,
      token: null,
      isAuthenticated: false,
      error: action.error,
    });
  }

  @Action(AuthActions.Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    // Clear error state, actual logout logic in service
    ctx.patchState({
      error: null,
    });
  }

  @Action(AuthActions.LogoutSuccess)
  logoutSuccess(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
      loading: false,
    });
  }

  @Action(AuthActions.RefreshToken)
  refreshToken(ctx: StateContext<AuthStateModel>) {
    // Clear errors before refresh attempt
    ctx.patchState({
      error: null,
    });
  }

  @Action(AuthActions.RefreshTokenSuccess)
  refreshTokenSuccess(
    ctx: StateContext<AuthStateModel>,
    action: AuthActions.RefreshTokenSuccess
  ) {
    ctx.patchState({
      token: action.token,
      error: null,
    });
  }

  @Action(AuthActions.RefreshTokenFailure)
  refreshTokenFailure(
    ctx: StateContext<AuthStateModel>,
    action: AuthActions.RefreshTokenFailure
  ) {
    ctx.patchState({
      error: action.error,
      // Optionally clear auth data on refresh failure
      isAuthenticated: false,
      token: null,
      user: null,
    });
  }

  @Action(AuthActions.SetAuthData)
  setAuthData(
    ctx: StateContext<AuthStateModel>,
    action: AuthActions.SetAuthData
  ) {
    ctx.patchState({
      user: action.payload.user,
      token: action.payload.token,
      isAuthenticated: true,
      error: null,
    });
  }

  @Action(AuthActions.ClearAuthData)
  clearAuthData(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
      loading: false,
    });
  }

  @Action(AuthActions.CheckAuthStatus)
  checkAuthStatus(ctx: StateContext<AuthStateModel>) {
    // This will trigger logic in the auth service to validate current auth state
    // The service will then dispatch appropriate success/failure actions
  }

  @Action(AuthActions.UpdateUserProfile)
  updateUserProfile(
    ctx: StateContext<AuthStateModel>,
    action: AuthActions.UpdateUserProfile
  ) {
    ctx.patchState({
      user: action.user,
    });
  }

  @Action(AuthActions.SetAuthenticationStatus)
  setAuthenticationStatus(
    ctx: StateContext<AuthStateModel>,
    action: AuthActions.SetAuthenticationStatus
  ) {
    ctx.patchState({
      isAuthenticated: action.isAuthenticated,
    });
  }

  @Action(AuthActions.TokenExpired)
  tokenExpired(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isAuthenticated: false,
      token: null,
      error: { message: 'Token has expired' },
    });
  }
}
