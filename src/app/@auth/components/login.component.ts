import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AppButtonComponent } from '../../@shared/components/app-button.component';

@Component({
  selector: 'app-login',
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
 
  <nz-col [nzXs]="0" [nzSm]="0" [nzMd]="0" [nzLg]="12" [nzXl]="12" class="left-panel">
    <div class="left-overlay">
    
      <img src="assets/img/logo.png" alt="logo" class="logo" />

      
      <h1 class="login-title">
        <span class="zsa">Online</span>
        <span class="container-text">Book Cove</span>
       
      </h1>

     
      <div class="flag-container">
        <div class="flag-circle slide-in"><span class="fi fi-us"></span></div>
        <div class="flag-circle slide-in"><span class="fi fi-gb"></span></div>
        <div class="flag-circle slide-in"><span class="fi fi-ca"></span></div>
      </div>
    </div>
  </nz-col>

  <!-- Right Column -->
  <nz-col [nzXs]="24" [nzSm]="24" [nzMd]="24" [nzLg]="12" [nzXl]="12" class="right-panel">
    <div class="login-wrapper">
      <div class="form-card">
        <img src="assets/img/logo.png" alt="logo" width="40" height="40" />
        <h4 class="info">Sign In</h4>

        <form nz-form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form" autocomplete="off">
          <nz-form-item>
            <nz-form-control nzErrorTip="Please input your userID!">
              <nz-input-group nzPrefixIcon="user">
                <input type="text" nz-input formControlName="userID" placeholder="User ID" />
              </nz-input-group>
            </nz-form-control>
          </nz-form-item>
       
       

          <nz-form-item>
            <nz-form-control nzErrorTip="Please input your password!">
              <nz-input-group nzPrefixIcon="lock">
                <input type="password" nz-input formControlName="password" placeholder="Password" />
              </nz-input-group>
            </nz-form-control>
          </nz-form-item>

          <app-button
            typeAttr="submit"
            [label]="'Login'"
            [type]="'primary'"
            [size]="'large'"
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
  styles: ``
})
export class LoginComponent implements OnInit
{

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
    this.onTriggerLogin.emit();
  }


  ngOnInit(): void {
    this.ensureControlsExist();
  }

}
