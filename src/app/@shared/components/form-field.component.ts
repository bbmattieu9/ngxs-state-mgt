import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzFormItemComponent, NzFormLabelComponent, NzFormControlComponent } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule,NzFormItemComponent, NzFormLabelComponent, NzFormControlComponent, NgIf],
  template: `
    <nz-form-item>
      <nz-form-label *ngIf="label" [nzFor]="nzFor" [nzRequired]="required">
        {{ label }}
      </nz-form-label>
      <nz-form-control [ngClass]="controlClass">
        <ng-content></ng-content>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: ``,
})
export class FormFieldComponent {
 @Input() label!: string;
  @Input() nzFor?: string;
  @Input() required = false;
  @Input() controlClass = '';
}
