import { inject, Injectable } from '@angular/core';
import { NzDrawerService, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Type } from '@angular/core';

export interface DrawerOptions {
  nzTitle?: string;
  nzWidth?: string | number;
  nzPlacement?: 'left' | 'right' | 'top' | 'bottom';
  nzClosable?: boolean;
  nzMaskClosable?: boolean;
  nzBodyStyle?: { [key: string]: string };
}

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  
  nzDrawerService = inject(NzDrawerService);

  openDrawer<T extends object>(
    component: Type<T>,
    data: any = {},
    options: DrawerOptions = {}
  ): NzDrawerRef {
    return this.nzDrawerService.create({
      nzTitle: options.nzTitle || 'Drawer',
      nzContent: component,
      nzWidth: options.nzWidth || 400,
      nzPlacement: options.nzPlacement || 'right',
      nzClosable: options.nzClosable !== false,
      nzMaskClosable: options.nzMaskClosable !== false,
      nzBodyStyle: options.nzBodyStyle || { padding: '20px' },
      nzData: data,
    });
  }
}
