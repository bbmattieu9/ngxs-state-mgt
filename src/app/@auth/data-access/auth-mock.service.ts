// auth-mock.service.ts
import { Injectable } from '@angular/core';
import { of, throwError, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../../@shared/types/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthMockService {
  constructor() {}

  private mockUser: User = {
    userId: '12345',
    name: 'Tunde Ogunmola',
    employeeClassCode: 'A1',
    staffId: 'S9876',
    unit: 'IT',
    branch: 'Head Office',
    userName: 'tunde.ogunmola',
    email: 'tunde.ogunmola@zenithbank.com',
    role: 'Admin',
    department: 'IT-BPA',
    branchId: '001',
  };


  login(credential: { userID: string; password: string }): Observable<any> {
    if (credential.userID === 'tunde.ogunmola' && credential.password === 'correct_password') {
      return of({
        user: this.mockUser,
        token: 'mock-auth-token-12345',
        responseDecription: 'Login successful'
      }).pipe(
        delay(2000)
      );
    } else {
      return throwError(() => ({
        error: {
          responseDecription: 'Invalid credentials',
          statusCode: 401
        }
      })).pipe(
        delay(2000) 
      );
    }
  }
}