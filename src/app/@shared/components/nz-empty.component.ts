import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';


@Component({
  selector: 'app-nz-empty-state',
  standalone: true,
  imports: [CommonModule, NzEmptyModule],
  template: `
     <div style="text-align: center; padding: 50px;">
      <nz-empty nzNotFoundImage="simple" [nzNotFoundContent]="emptyTpl"></nz-empty>
        <p style="margin-top: 16px;">Please use the search option to view transactions.</p>
     </div>

        <ng-template #emptyTpl>
        </ng-template>
  `,
  styles: ``
})
export class NzEmptyStateComponent  { 


}