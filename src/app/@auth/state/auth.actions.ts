// auth.actions.ts

import { User } from "../../@shared/types/user-model";
import { AuthError } from "../types/auth-types";


export namespace AuthActions {
  export class Login {
    static readonly type = '[Auth] Login';
    constructor(public credential: { userID: string; password: string }) {}
  }

  export class LoginSuccess {
    static readonly type = '[Auth] Login Success';
    constructor(public payload: { user: User; token: string }) {}
  }

  export class LoginFailure {
    static readonly type = '[Auth] Login Failure';
    constructor(public error: AuthError) {}
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }

  export class LogoutSuccess {
    static readonly type = '[Auth] Logout Success';
  }

  export class RefreshToken {
    static readonly type = '[Auth] Refresh Token';
  }

  export class RefreshTokenSuccess {
    static readonly type = '[Auth] Refresh Token Success';
    constructor(public token: string) {}
  }

  export class RefreshTokenFailure {
    static readonly type = '[Auth] Refresh Token Failure';
      constructor(public error: AuthError) {}
  }


    export class SetAuthData {
    static readonly type = '[Auth] Set Auth Data';
    constructor(public payload: { user: User; token: string }) {}
  }

  export class ClearAuthData {
    static readonly type = '[Auth] Clear Auth Data';
  }

  export class CheckAuthStatus {
    static readonly type = '[Auth] Check Auth Status';
  }

export class UpdateUserProfile {
    static readonly type = '[Auth] Update User Profile';
    constructor(public user: User) {}
  }
  export class SetAuthenticationStatus {
    static readonly type = '[Auth] Set Authentication Status';
    constructor(public isAuthenticated: boolean) {}
  }

  export class TokenExpired {
    static readonly type = '[Auth] Token Expired';
  }
}
