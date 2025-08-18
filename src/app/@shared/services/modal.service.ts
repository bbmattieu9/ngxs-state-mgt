import { Injectable } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { Type } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private nzModalService: NzModalService) {}

  openModal<T>(
    component: Type<T>,
    data: any,
    options?: { 
      nzTitle?: string; 
      nzWidth?: string;
      nzCentered?: boolean;
      nzBodyStyle?: { [key: string]: string };
    }
  ): NzModalRef {
    return this.nzModalService.create({
      nzTitle: options?.nzTitle || 'Modal',
      nzContent: component,
      nzWidth: options?.nzWidth || '700px',
      nzCentered: options?.nzCentered !== false, // Default to centered
      nzBodyStyle: options?.nzBodyStyle || { padding: '24px' },
      nzClassName: 'custom-modal-with-border-radius',
      nzData: { data },
      nzFooter: null,
      nzMaskClosable: false,
    });
  }
}
