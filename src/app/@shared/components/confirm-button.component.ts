import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-confirm-button',
  standalone: true,
  imports: [CommonModule, NzPopconfirmModule, NzButtonModule],
  template: `
    <button
      nz-button
      [nzType]="type"
      [nzDanger]="danger"
      nz-popconfirm
      [nzPopconfirmTitle]="titleTemplate"
      (nzOnConfirm)="onConfirm()"
      (nzOnCancel)="onCancel()"
    >
      <ng-content></ng-content>
    </button>

    <ng-template #titleTemplate>
      {{ title }}
    </ng-template>
    
    <!-- <ng-template #contentTemplate>
      {{ content }}
    </ng-template> -->
  `,
  styles: ``
})
export class ConfirmButtonComponent {

  @Input() type: 'primary' | 'default' | 'dashed' | 'link' = 'default';
  @Input() danger = false;
  @Input() title = 'Confirm Action';
  @Input() content = 'Are you sure?';

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();


  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }

}
