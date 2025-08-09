import { Component, ContentChild, inject, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { Subject, takeUntil, tap } from 'rxjs';
import { LoadingService } from '../../@core/services/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, NzSpinModule],
  template: `
    @if (loading$ | async) {
      <div class="spinner-container">
        @if (customLoadingIndicator) {
          <ng-container *ngTemplateOutlet="customLoadingIndicator"></ng-container>
        } @else {
          <!-- TODO: add ng zorro -->
          <nz-spin nzSimple nzSize="large"></nz-spin>
        }
      </div>
    }
  `,
  styles: [`
    .spinner-container {
      position: fixed;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      background: rgba(69, 61, 59, 0.6);
      z-index: 2000;
    }

    .ant-spin-dot .ant-spin-dot-spin {
      color: #e3000f !important;
    }
  `]
})
export class LoaderComponent implements OnInit, OnDestroy {
    
  loadingService = inject(LoadingService);
  router = inject(Router);


  readonly loading$ = this.loadingService.loading$;
  private destroy$ = new Subject<void>();

  @Input() detectRouteTransitions = false;
  @ContentChild('loading', { read: TemplateRef }) customLoadingIndicator: TemplateRef<any> | null = null;


  ngOnInit(): void {
    if (!this.detectRouteTransitions) return;

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        tap((event) => {
          if (event instanceof RouteConfigLoadStart) {
            this.loadingService.loadingOn();
          } else if (event instanceof RouteConfigLoadEnd) {
            this.loadingService.loadingOff();
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
