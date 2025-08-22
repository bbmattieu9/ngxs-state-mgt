import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important for *ngIf
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Subscription } from 'rxjs';
import { NzProgressModule } from 'ng-zorro-antd/progress'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-idle-countdown',
  standalone: true,
  imports: [CommonModule, NzProgressModule],
  template: `
 <div *ngIf="showDialog" class="idle-timer-container">
  <nz-progress
    [nzPercent]="countdownProgress"
    [nzWidth]="40"
    nzType="circle"
    nzStrokeColor="#ff4d4f"
    [nzFormat]="formatProgress"
  ></nz-progress>
  <p class="warning-text">You will be logged out</p>
</div>
  `,
  styles: `
  .idle-timer-container {
  position: fixed;
  bottom: 50px; /* Adjust as needed */
  right: 50px; /* Adjust as needed */
  z-index: 9999;
  text-align: center;
  z-index: 9999;
  pointer-events: none;
  /* Add more styling for the button if you want it to look more distinct */
}

.warning-text {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}


::ng-deep .ant-progress-text {
      color: #ff4d4f !important;
      font-weight: bold;
      font-size: 14px;
    }
  `
})
export class IdleCountdownComponent implements  OnInit, OnDestroy {

  
  public countdown = 0;
  public countdownProgress = 100;
  public showDialog = false;

  private idleSubscription!: Subscription;
  private timeoutSubscription!: Subscription;
  private timeoutWarningSubscription!: Subscription;

  constructor(private idle: Idle, private router: Router) {}

  ngOnInit(): void {
    this.idle.setIdle(120); // 2 minutes
    this.idle.setTimeout(60); // 60 seconds countdown
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idleSubscription = this.idle.onIdleEnd.subscribe(() => {
      this.stopCountdown();
    });

    // this.timeoutSubscription = this.idle.onTimeout.subscribe(() => {
    //   this.logout();
    // });

    this.timeoutWarningSubscription = this.idle.onTimeoutWarning.subscribe((countdown) => {

      this.countdown = countdown;
      this.countdownProgress = (countdown / 60) * 100; // This reduces the bar
      this.showDialog = true;
    });

    this.timeoutSubscription = this.idle.onTimeout.subscribe(() => {
      // Set the countdown to 0 just before logging out to ensure it's displayed.
      this.countdown = 0;
      this.countdownProgress = 0;
      this.logout();
    });

    this.idle.watch();
  }

  // public formatProgress = (percent: number): string => `${this.countdown}`;

  public formatProgress = (): string => {
    return this.countdown <= 0 ? '0' : `${this.countdown}`;
  };

  stopCountdown() {
    this.showDialog = false;
  }

  logout() {
    console.log('User logged out due to inactivity.');
    // Implement your logout logic here
    this.showDialog = false;
    
  }

  ngOnDestroy(): void {
    this.idle.stop();
    this.idleSubscription.unsubscribe();
    this.timeoutSubscription.unsubscribe();
    this.timeoutWarningSubscription.unsubscribe();
  }

}
