// auth.state.ts
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AuthActions } from './auth.actions';

// Adjust these interfaces to match your existing models
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
  // Add other user properties as needed
}

export interface AuthStateModel {
  user: User | null;
  token: string | null;
  refreshToken?: string | null;
  isAuthenticated: boolean;
  error: any;
  lastLoginTime?: Date | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    error: null,
    lastLoginTime: null
  }
})
@Injectable()
export class AuthState {

  // Selectors
  @Selector()
  static user(state: AuthStateModel): User | null {
    return state.user;
  }

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
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
  static userRoles(state: AuthStateModel): string[] {
    return state.user?.roles || [];
  }

  @Selector()
  static userName(state: AuthStateModel): string {
    return state.user?.username || '';
  }

  @Selector()
  static userEmail(state: AuthStateModel): string {
    return state.user?.email || '';
  }

  // Action Handlers
  @Action(AuthActions.Login)
  login(ctx: StateContext<AuthStateModel>, action: AuthActions.Login) {
    // Clear any previous errors
    ctx.patchState({
      error: null
    });
    
    // The actual login HTTP call will be handled in the auth service
    // This action just clears the error state
  }

  @Action(AuthActions.LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: AuthActions.LoginSuccess) {
    ctx.patchState({
      user: action.payload.user,
      token: action.payload.token,
      isAuthenticated: true,
      error: null,
      lastLoginTime: new Date()
    });
  }

  @Action(AuthActions.LoginFailure)
  loginFailure(ctx: StateContext<AuthStateModel>, action: AuthActions.LoginFailure) {
    ctx.patchState({
      user: null,
      token: null,
      isAuthenticated: false,
      error: action.error,
      lastLoginTime: null
    });
  }

  @Action(AuthActions.Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    // Clear error state, actual logout logic in service
    ctx.patchState({
      error: null
    });
  }

  @Action(AuthActions.LogoutSuccess)
  logoutSuccess(ctx: StateContext<AuthStateModel>) {
    // Reset to initial state
    ctx.setState({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
      lastLoginTime: null
    });
  }

  @Action(AuthActions.RefreshToken)
  refreshToken(ctx: StateContext<AuthStateModel>) {
    // Clear errors before refresh attempt
    ctx.patchState({
      error: null
    });
  }

  @Action(AuthActions.RefreshTokenSuccess)
  refreshTokenSuccess(ctx: StateContext<AuthStateModel>, action: AuthActions.RefreshTokenSuccess) {
    ctx.patchState({
      token: action.token,
      error: null
    });
  }

  @Action(AuthActions.RefreshTokenFailure)
  refreshTokenFailure(ctx: StateContext<AuthStateModel>, action: AuthActions.RefreshTokenFailure) {
    ctx.patchState({
      error: action.error,
      // Optionally clear auth data on refresh failure
      isAuthenticated: false,
      token: null,
      user: null
    });
  }

  @Action(AuthActions.SetAuthData)
  setAuthData(ctx: StateContext<AuthStateModel>, action: AuthActions.SetAuthData) {
    ctx.patchState({
      user: action.payload.user,
      token: action.payload.token,
      isAuthenticated: true,
      error: null
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
      lastLoginTime: null
    });
  }

  @Action(AuthActions.CheckAuthStatus)
  checkAuthStatus(ctx: StateContext<AuthStateModel>) {
    // This will trigger logic in the auth service to validate current auth state
    // The service will then dispatch appropriate success/failure actions
  }

  @Action(AuthActions.UpdateUserProfile)
  updateUserProfile(ctx: StateContext<AuthStateModel>, action: AuthActions.UpdateUserProfile) {
    ctx.patchState({
      user: action.user
    });
  }

  @Action(AuthActions.SetAuthenticationStatus)
  setAuthenticationStatus(ctx: StateContext<AuthStateModel>, action: AuthActions.SetAuthenticationStatus) {
    ctx.patchState({
      isAuthenticated: action.isAuthenticated
    });
  }

  @Action(AuthActions.TokenExpired)
  tokenExpired(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isAuthenticated: false,
      token: null,
      error: { message: 'Token has expired' }
    });
  }
}