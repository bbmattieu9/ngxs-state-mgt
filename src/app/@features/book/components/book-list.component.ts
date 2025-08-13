import { Component, inject } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AddBook, DeleteBook, GetBooks, UpdateBook } from '../actions/book.actions';
import { Store } from '@ngxs/store';
import { BooksState } from '../state/book.state';
import { Book } from '../types/books.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BookTableComponent } from "../../../@shared/components/book-table.component";
import { ColumnDefinition } from '../../../@shared/types/table-types';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModalService } from '../../../@shared/services/modal.service';
import { BookFormModalComponent } from '../../../@shared/components/book-form-modal.component';


@Component({
  selector: 'app-book-list',
  imports: [
     NzTableModule, 
     NzModalModule, 
     NzDrawerModule,
     AsyncPipe, CommonModule, 
     NzButtonModule, 
     NzDividerModule, 
     NzIconModule, 
     BookTableComponent],
  template: `

  <button nz-button (click)="addBook()">Add Book</button>
  

  <!--  (view)="openViewDrawer($event)" -->
   <app-book-table
      [data]="(books$ | async) ?? []"
      [columns]="columns"
     
      (edit)="editBook($event)"
      (delete)="deleteBook($event)">
   </app-book-table>
  
  `,
  styles: `
  
  .tbl__icon {
    cursor: pointer;
  }`
})
export class BookListComponent {

  store = inject(Store);
  books$ = this.store.select(BooksState.books);

  private modalService = inject(ModalService);

  columns: ColumnDefinition[]  = [
    { key: 'id', label: 'ID', width: '40px', nzAlign: 'center' },
    { key: 'title', label: 'Title', width: '100px' },
    { key: 'author', label: 'Author', width: '100px' },
    { key: 'isbn', label: 'ISBN', width: '100px', nzAlign: 'center' },
  ];
  
  ngOnInit(): void {
    this.store.dispatch(new GetBooks());
  }

  openViewDrawer(book: Book) {

    // TODO: Logic to open a drawer and pass the book data
  }

  deleteBook(id: number) {
    this.store.dispatch(new DeleteBook(id));
  }


  addBook(): void {
    const modalRef = this.modalService.openModal(BookFormModalComponent, { mode: 'add' }, { nzTitle: 'Add New Book' });
    modalRef.afterClose.subscribe(result => {
      if (result) {
        this.store.dispatch(new AddBook(result));
      }
    });
  }

  editBook(book: Book): void {
    const modalRef = this.modalService.openModal(BookFormModalComponent, { mode: 'edit', book }, { nzTitle: 'Edit Book' });
    modalRef.afterClose.subscribe(result => {
      if (result) {
        this.store.dispatch(new UpdateBook(result));
      }
    });
  }

}
