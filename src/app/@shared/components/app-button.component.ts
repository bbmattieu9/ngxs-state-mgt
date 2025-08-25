import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule],
  template: `
    <button
      nz-button
      [nzType]="type"
      [nzSize]="size"
      [nzDanger]="danger"
      [nzLoading]="loading"
      [nzShape]="shape"
      [disabled]="disabled"
      [class]="customClass"
      [style]="customStyle"
      (click)="onClick()"
    >
      <span nz-icon [nzType]="icon" *ngIf="icon"></span>
      <ng-content></ng-content>
    </button>
  `,
  styles: `
    button {
      border-radius: 6px !important;
      transition: all 0.3s ease;
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    button:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.1s ease;
    }
    
    button:disabled {
      transform: translateY(0) !important;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
    }
  `
})
export class AppButtonComponent {
  @Input() type: 'primary' | 'default' | 'dashed' | 'text' | 'link' = 'default';
  @Input() size: 'large' | 'default' | 'small' = 'default';
  @Input() danger = false;
  @Input() loading = false;
  @Input() disabled = false;
  @Input() shape: 'circle' | 'round' | null = null;
  @Input() icon?: string;
  @Input() customClass?: string;
  @Input() customStyle?: string;
  @Input() label: string = '';

  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
