import { Component, inject } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AddBook, DeleteBook, GetBooks } from '../actions/book.actions';
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
  
   <app-book-table
      [data]="(books$ | async) ?? []"
      [columns]="columns"
      (view)="openViewDrawer($event)"
      (edit)="openEditModal($event)"
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

  openEditModal(book: Book) {

    // TODO: Logic to open a modal for editing

    console.log('[ __OpenEditModal__ ]:', book);
  }

  deleteBook(id: number) {
    this.store.dispatch(new DeleteBook(id));
  }

  edit(book: Book) {

  }

}
