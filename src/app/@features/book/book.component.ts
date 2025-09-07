import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzPopoverModule,
    // IdleCountdownComponent,
    NzAvatarModule,
  ],
  template: `
    <!-- i removed nzBreakpoint="md" -->
    <nz-layout class="app-layout">
      <nz-sider
        class="menu-sidebar"
        nzCollapsible
        nzWidth="256px"
        
        [(nzCollapsed)]="isCollapsed"
        [nzTrigger]="null"
      >
        <div class="sidebar-logo">
          <a href="#">
            <img src="assets/img/logo.png" alt="logo" />
            <h1>Book Store</h1>
          </a>
        </div>
        <ul
          nz-menu
          nzTheme="dark"
          nzMode="inline"
          [nzInlineCollapsed]="isCollapsed"
        >
          <li nz-submenu nzOpen nzTitle="Dashboard" nzIcon="dashboard">
            <ul>
             
            </ul>
          </li>
        </ul>
      </nz-sider>
      <nz-layout>
        <nz-header>
          <div class="app-header">
            <span class="header-trigger">
              <!-- (click)="isCollapsed = !isCollapsed" -->
              <!-- <span
                class="trigger"
                nz-icon
                [nzType]="isCollapsed ? 'menu-fold' : 'menu-unfold'"
              ></span> -->
              <h3>
                <span>
                  <!-- <img [src]="flagImagePath" alt="country flag" width="16" class="flag-icon" *ngIf="flagImagePath" /> -->
                </span>
              </h3>
            </span>



            <!-- <div class="user-info">
             
              <nz-avatar [nzText]="abbreviatedName"></nz-avatar>

               <div
                nz-popover
                [nzPopoverContent]="contentTemplate"
                nzPopoverPlacement="bottom"
                class="bold-text"
              >
              <div class="user__details">
                <span class="username">{{ user?.name }}</span>
                <span class="branch__line">
                  <span class="branch__label">Branch:</span>
                  <span class="branch__name">{{ user?.branch }}</span>
                </span>
              </div>
        </div>
              <ng-template #contentTemplate>
                <div class="popver__content">
                 <a class="bold-text-black" (click)="logOut()"> Log Out</a>
                </div>
              </ng-template>

             

            </div> -->


          </div>
        </nz-header>
        <nz-content class="content-scroll">
          <div class="inner-content">
            <router-outlet></router-outlet>

           <!-- <ng-container *ngIf="authenticated">
              <app-idle-countdown></app-idle-countdown>
            </ng-container> -->

          </div>
           
        </nz-content>
      </nz-layout>
    </nz-layout>
  `,
   styles: `


:host {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.app-layout {
  height: 100%;
}

nz-layout.nz-layout-has-sider {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

nz-header, nz-sider {
  flex-shrink: 0;
}

nz-content {
  flex: 1; 
  overflow: hidden; 
  display: flex; 
  flex-direction: column;
  padding: 24px;
}

.inner-content {
  flex: 1; 
  overflow: hidden;
  background: #fff;
  border-radius: 10px;
  height: 100%;
}

::ng-deep .ant-avatar-circle  {
    background: #001529;
}




/* Rest of your existing styles can remain below */
.menu-sidebar {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 5px 24px 0 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.menu-sidebar {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0,21,41,.35);
}

.header-trigger {
  height: 64px;
  padding: 20px 24px;
  font-size: 20px;
  cursor: pointer;
  transition: all .3s,padding 0s;
}

.trigger:hover {
  color: #1890ff;
}

.sidebar-logo {
  position: relative;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  line-height: 64px;
  background: #001529;
  transition: all .3s;
}

.sidebar-logo img {
  display: inline-block;
  height: 32px;
  width: 32px;
  vertical-align: middle;
}

.sidebar-logo h1 {
  display: inline-block;
  margin: 0 0 0 20px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  vertical-align: middle;
}

nz-header {
  padding: 0;
  width: 100%;
  z-index: 2;
}

.app-header {

  display: flex;
  align-items: center;
  align-items: center;
  justify-content: space-between; 
  height: 64px;
  padding: 5px 24px 0 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-trigger {
  display: flex;
  align-items: center;
  height: 100%;
}


.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user__details {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  cursor: pointer;
}

.username {
  font-weight: 500;
  color: #333;
}

.branch__line {
  font-size: 12px;
  font-weight: bold;
}

.branch__label {
  color: #aaa; 
  font-weight: normal;
  margin-right: 4px;
}

.branch__name {
  color: #333;
  font-weight: bold;
}


.trigger {
  font-size: 20px;
  cursor: pointer;
}

  `,
})
export class BookComponent  implements OnInit {

   abbreviatedName: string = '';
    isCollapsed: boolean = true;
    userCountryCode: string | undefined;
    authenticated: boolean = true;
    // user: User | null = null;
    // authSrv = inject(AuthService);
  
    ngOnInit(): void {

      // this.authSrv.currentUser$.subscribe((user) => {
      //   this.user = user;
      //   if (this.user?.userId) {
      //     this.abbreviatedName = this.getInitials(this.user.name);
      //   }
      // });

      // if(this.user && this.user.countryCode) {
      //   this.userCountryCode = this.user.countryCode;
      // }
    }
  
    getInitials(name: string): string {
      return name
      .split(/[ .]/)
        .map((part) => part.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);
    }

  
 

}
