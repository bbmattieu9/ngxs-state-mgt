import { User } from "../../@shared/types/user-model";

;

export type AuthCredentials = {
  userID: string;
  piN_OTP?: string;
  password?: string;
  applicationID?: string;
};


export type AuthMode = 'password' | 'piN_OTP';

export interface AuthResponse {
  content: {
    token: string;
    user: User;
  };
  error: string | null;
  hasError: boolean;
  errorMessage: string;
  message: string | null;
  isSuccess: boolean;
  requestTime: string;
  responseTime: string;
}

