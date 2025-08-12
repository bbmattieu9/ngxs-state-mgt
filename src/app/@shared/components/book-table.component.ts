import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ColumnDefinition } from '../types/table-types';
import { ConfirmButtonComponent } from './confirm-button.component';

@Component({
  selector: 'app-book-table',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzIconModule,
    NzDividerModule,
    NzLayoutModule,
    ConfirmButtonComponent,
  ],
  template: `
    <nz-table #basicTable [nzData]="data ?? []" nzShowPagination>
      <thead>
        <tr>
          @for (col of columns; track col) {
          <th [nzAlign]="col.nzAlign ?? 'left'" [nzWidth]="col.width ?? 'auto'">
            {{ col.label }}
          </th>
          }
          <th nzAlign="center" width="50px">Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (row of basicTable.data; track row) {
        <tr>
          @for (col of columns; track col) {
          <td [nzAlign]="col.nzAlign ?? 'left'">{{ row[col.key] }}</td>
          }
          <td nzAlign="center">
            <nz-icon
              class="tbl__icon"
              nzType="folder-open"
              nzTheme="outline"
              (click)="view.emit(row)"
            ></nz-icon>
            <nz-divider nzType="vertical"></nz-divider>
            <nz-icon
              class="tbl__icon"
              nzType="delete"
              nzTheme="outline"
              (click)="delete.emit(row.id)"
            ></nz-icon>
            <nz-divider nzType="vertical"></nz-divider>

            <!-- <nz-icon class="tbl__icon" nzType="edit" nzTheme="outline" (click)="edit.emit(row)"></nz-icon> -->

            <app-confirm-button
              type="link"
              [danger]="true"
              title="Confirm Deletion"
              content="Are you sure you want to delete this book?"
              (confirmed)="delete.emit(row.id)"
            >
              <nz-icon nzType="delete" nzTheme="outline"></nz-icon>
            </app-confirm-button>
          </td>
        </tr>
        }
      </tbody>
    </nz-table>
  `,
  styles: `
  
  .tbl__icon {
    cursor: pointer;
  }
  `,
})
export class BookTableComponent {
  @Input() data: any[] | null = [];
  @Input() columns: ColumnDefinition[] = [];

  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
}
