import { User } from "../../@shared/types/user-model";

;

export type AuthCredentials = {
  userID: string;
  password: string;
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


export interface AuthError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}
