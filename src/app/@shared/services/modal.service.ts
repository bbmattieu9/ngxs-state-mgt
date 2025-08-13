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
    options?: { nzTitle?: string; nzWidth?: string }
  ): NzModalRef {
    return this.nzModalService.create({
      nzTitle: options?.nzTitle || 'Modal',
      nzContent: component,
      nzWidth: options?.nzWidth || '620px',
      nzData: { data },
      nzFooter: null, // TODO: to be handled in the component
    });
  }
}
