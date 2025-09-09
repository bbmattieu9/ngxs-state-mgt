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
      [attr.type]="typeAttr"
      [disabled]="isDisabled || isLoading"
      [ngClass]="[
        'btn',
        'btn-' + type,
        'btn-' + size,
        fullWidth ? 'btn-full' : ''
      ]"
      (click)="emitClick()"
    >
      <ng-container *ngIf="icon">
        <i [nzType]="icon" nz-icon class="icon-left"></i>
      </ng-container>
      {{ label }}
    </button>
  `,
  styles: ``,
})
export class AppButtonComponent {
  @Input() label: string = 'Click';
  @Input() loadingText: string = 'Loading...';
  @Input() typeAttr: 'button' | 'submit' | 'reset' = 'button';
  @Input() type:
    | 'primary'
    | 'default'
    | 'dashed'
    | 'link'
    | 'text'
    | 'secondary'
    | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() icon: string | null = null;
  @Input() isLoading: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() width: string = '';
  @Input() fullWidth = false;

  @Output() onClick = new EventEmitter<void>();

  emitClick(): void {
    if (!this.isLoading) {
      this.onClick.emit();
    }
  }
}