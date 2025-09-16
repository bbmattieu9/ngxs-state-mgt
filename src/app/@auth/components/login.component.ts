import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AppButtonComponent } from '../../@shared/components/app-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzGridModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    AppButtonComponent,
  ],
  template: `
    <nz-row class="full-height">
      <nz-col
        [nzXs]="0"
        [nzSm]="0"
        [nzMd]="0"
        [nzLg]="12"
        [nzXl]="12"
        class="left-panel"
      >
        <div class="left-overlay">
          <img src="assets/img/logo.png" alt="logo" class="logo" />

          <h1 class="login-title">
            <span class="zsa">Online</span>
            <span class="container-text">Book Cove</span>
          </h1>

          <div class="flag-container">
            <div class="flag-circle slide-in">
              <span class="fi fi-us"></span>
            </div>
            <div class="flag-circle slide-in">
              <span class="fi fi-gb"></span>
            </div>
            <div class="flag-circle slide-in">
              <span class="fi fi-ca"></span>
            </div>
          </div>
        </div>
      </nz-col>

      <!-- Right Column -->
      <nz-col
        [nzXs]="24"
        [nzSm]="24"
        [nzMd]="24"
        [nzLg]="12"
        [nzXl]="12"
        class="right-panel"
      >
        <div class="login-wrapper">
          <div class="form-card">
            <img src="assets/img/logo.png" alt="logo" width="40" height="40" />
            <h4 class="info">Sign In</h4>

            <form
              nz-form
              [formGroup]="loginForm"
              (ngSubmit)="onSubmit()"
              class="login-form"
              autocomplete="off"
            >
              <nz-form-item>
                <nz-form-control nzErrorTip="Please input your userID!">
                  <nz-input-group nzPrefixIcon="user">
                    <input
                      type="text"
                      nz-input
                      formControlName="userID"
                      placeholder="User ID"
                    />
                  </nz-input-group>
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-control nzErrorTip="Please input your password!">
                  <nz-input-group nzPrefixIcon="lock">
                    <input
                      type="password"
                      nz-input
                      formControlName="password"
                      placeholder="Password"
                    />
                  </nz-input-group>
                </nz-form-control>
              </nz-form-item>

              <app-button
                typeAttr="submit"
                [label]="'Login'"
                [type]="'primary'"
                [size]="'lg'"
              ></app-button>
            </form>
          </div>

          <div class="footer text-center mt-4">
            <p>© {{ currentYear }} All rights reserved.</p>
          </div>
        </div>
      </nz-col>
    </nz-row>
  `,
    styles: `
// @use 'main' as *;

.full-height {
  height: 100vh;
  overflow: hidden;
}

.left-panel {
  position: relative;
  // background: url('assets/img/red-black.jpg') no-repeat center center / cover;
}

.left-overlay {
  position: relative;
  height: 100%;
  width: 100%;
  background: linear-gradient(105deg, rgba(69, 61, 59, 0.75), rgba(69, 61, 59, 0.35));
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  width: 50px;
  height: auto;
}

.login-title {
  margin-top: 6rem;
  margin-bottom: 2rem;
}
.login-title span {
  display: block;
  font-weight: bold;
  font-size: 6rem;
  color: #fefef1;
  text-transform: uppercase;
  line-height: 1;
  animation-duration: 1.5s;
  animation-fill-mode: both;
}
.zsa { animation-name: slideUp; }
.container-text { animation-name: slideUp; animation-delay: 0.3s; }
.management-app { animation-name: slideUp; animation-delay: 0.6s; }

.flag-container {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
.flag-circle {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  opacity: 0;
  transform: translateY(50px);
  animation: slideUp 1.5s ease forwards;
}
.flag-circle:nth-child(1) { animation-delay: 0.9s; }
.flag-circle:nth-child(2) { animation-delay: 1.2s; }
.flag-circle:nth-child(3) { animation-delay: 1.5s; }

.right-panel {
  background-color: #fefef1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  width: 100%;
  padding: 4rem 2rem;
}

.form-card {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
 // margin-bottom: 2rem;
}

.info {
  font-weight: var(--fw-bold-700);
  font-size: 1rem;
  margin-bottom: 1rem;
  padding: 10px 0;
}

.footer {
  font-size: 0.75rem;
  color: #777;
  text-align: center;
  margin-top: 1rem;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 992px) {
  .left-panel { display: none; }
  .right-panel { width: 100%; }
  .login-title span { font-size: 2.5rem; }
}

@media (max-width: 576px) {
  .form-card { padding: 1.5rem; }
  .login-title span { font-size: 2rem; }
}
  `,
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      userID: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  currentYear = new Date().getFullYear();

  @Input() loginForm!: FormGroup;
  @Input() loggingIn = false;
  @Output() onTriggerLogin = new EventEmitter<any>();

  ensureControlsExist(): void {
    if (!this.loginForm.get('userID')) {
      this.loginForm.addControl('userID', new FormControl(''));
    }
    if (!this.loginForm.get('password')) {
      this.loginForm.addControl('password', new FormControl(''));
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.onTriggerLogin.emit(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.ensureControlsExist();
  }
}
