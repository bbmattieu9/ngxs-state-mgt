import { Component, inject } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import {
  AddBook,
  DeleteBook,
  GetBooks,
  SetBookFilters,
  UpdateBook,
} from '../actions/book.actions';
import { Store } from '@ngxs/store';
import { BooksState } from '../state/book.state';
import { Book } from '../types/books.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BookTableComponent } from '../../../@shared/components/book-table.component';
import { ColumnDefinition } from '../../../@shared/types/table-types';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModalService } from '../../../@shared/services/modal.service';
import { DrawerService } from '../../../@shared/services/drawer.service';
import { BookFormModalComponent } from '../../../@shared/components/book-form-modal.component';
import { ViewBookComponent } from '../../../@shared/components/view-book.component';
import { BookFilterComponent } from '../../../@shared/components/book-filter.component';
import { AppButtonComponent } from '../../../@shared/components/app-button.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  imports: [
    NzTableModule,
    NzModalModule,
    NzDrawerModule,
    AsyncPipe,
    CommonModule,
    NzDividerModule,
    NzIconModule,
    BookTableComponent,
    AppButtonComponent,
    NzSelectModule,
    FormsModule,
  ],
  template: `
    <div class="page-header">
      <div class="header-left">
          <app-button type="default" icon="filter" (clicked)="openFilterDrawer()">
            Filter
          </app-button>


        <app-button 
            type="default" 
            icon="reload" 
            (clicked)="resetFilters()"
            [disabled]="!(isFiltered$ | async)">
          Reset Filters
        </app-button>
   </div>

      <div class="header-right">
        <nz-select 
          [(ngModel)]="pageSize" 
          (ngModelChange)="onPageSizeChange($event)"
          nzPlaceHolder="Select Page Size"
          style="width: 120px; margin-right: 8px;"
        >
          @for (option of pageSizeOptions; track option) {
            <nz-option [nzLabel]="option + ' / page'" [nzValue]="option"></nz-option>
          }
        </nz-select>

        <app-button type="primary" icon="plus" (clicked)="addBook()">
          Add Book
        </app-button>
      </div>
    </div>

    <app-book-table
      [data]="(books$ | async) ?? []"
      [columns]="columns"
      (view)="openViewDrawer($event)"
      (edit)="editBook($event)"
      (delete)="deleteBook($event)"
      [nzPageSize]="pageSize"
      [nzPageSizeOptions]="pageSizeOptions"
      (nzPageSizeChange)="onPageSizeChange($event)"
    >
    </app-book-table>
  `,
  styles: `
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 0 8px;
  }
  
  .header-left {
    display: flex;
    gap: 8px;
  }
  
  .header-right {
    display: flex;
    gap: 8px;
  }
  
  .tbl__icon {
    cursor: pointer;
  }`,
})
export class BookListComponent {

  store = inject(Store);
  private modalService = inject(ModalService);
  private drawerService = inject(DrawerService);
  
  books$ = this.store.select(BooksState.filteredBooks);
  isFiltered$ = this.store.select(state => Object.keys(state.books.filters).length > 0);

  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  columns: ColumnDefinition[] = [
    { key: 'id', label: 'ID', width: '40px', nzAlign: 'center' },
    { key: 'title', label: 'Title', width: '150px' },
    { key: 'author', label: 'Author', width: '100px' },
    { key: 'isbn', label: 'ISBN', width: '100px', nzAlign: 'center' },
  ];

  ngOnInit(): void {
    this.store.dispatch(new GetBooks());
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    // Optionally dispatch an action to update the store if pagination state is managed globally
  }

  openViewDrawer(book: Book) {
    const drawerRef = this.drawerService.openDrawer(
      ViewBookComponent,
      { book },
      {
        nzTitle: `Book Details:`,
        nzWidth: 500,
        nzPlacement: 'right',
        nzBodyStyle: { padding: '20px' },
      }
    );

    drawerRef.afterClose.subscribe((result) => {
      console.log('View drawer closed:', result);
     
    });
  }

  openFilterDrawer() {
    const drawerRef = this.drawerService.openDrawer(
      BookFilterComponent,
      {},
      {
        nzTitle: 'Filter Books',
        nzWidth: 400,
        nzPlacement: 'right',
        nzBodyStyle: { padding: '20px' },
      }
    );

    drawerRef.afterClose.subscribe((filters) => {
      if (filters !== undefined) {
        this.store.dispatch(new SetBookFilters(filters));
      }
    });
  }

  deleteBook(id: number) {
    this.store.dispatch(new DeleteBook(id));
  }

  addBook(): void {
    const modalRef = this.modalService.openModal(
      BookFormModalComponent,
      { mode: 'add' },
      {
        nzTitle: 'Add New Book',
        nzWidth: '650px',
        nzCentered: true,
        nzBodyStyle: { padding: '20px', maxHeight: '70vh', overflow: 'auto' },
      }
    );
    modalRef.afterClose.subscribe((result) => {
      if (result) {
        this.store.dispatch(new AddBook(result));
      }
    });
  }

  editBook(book: Book): void {
    console.log('[ __Selected Book__ ]:', book);
    const modalRef = this.modalService.openModal(
      BookFormModalComponent,
      { mode: 'edit', book },
      {
        nzTitle: 'Edit Book',
        nzWidth: '650px',
        nzCentered: true,
        nzBodyStyle: { padding: '20px', maxHeight: '70vh', overflow: 'auto' },
      }
    );
    modalRef.afterClose.subscribe((result) => {
      if (result) {
        this.store.dispatch(new UpdateBook(result));
      }
    });
  }

  resetFilters() {
    this.store.dispatch(new SetBookFilters({}));
  }
}
