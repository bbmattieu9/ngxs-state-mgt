import { Component, inject } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AddBook, DeleteBook, GetBooks } from '../actions/book.actions';
import { Store } from '@ngxs/store';
import { BooksState } from '../state/book.state';
import { Book } from '../types/books.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-book-list',
  imports: [NzTableModule, AsyncPipe, CommonModule, NzButtonModule, NzDividerModule ],
  template: `
  
   <nz-table #basicTable [nzData]="(books$ | async) ?? []">
        <thead>
       
          <tr>
            <th width="100px">s/n</th>
            <th width="100px">Title</th>
            <th width="100px">Author</th>
            <th width="100px">ISBN</th>
            <th width="100px">Actions</th>
          </tr>
        </thead>
        <tbody>
        @for (data of basicTable.data; track data) {
          <tr>
            <td nzAlign="center">{{ data.id }}</td>
            <td nzAlign="center">{{ data.title }}</td>
            <td nzAlign="center">{{ data.author }}</td>
            <td nzAlign="center">{{ data.isbn }}</td>
            <td nzAlign="center">
            <button nz-button nzType="primary" (click)="delete(data.id)">Delete</button>
            <nz-divider nzType="vertical"></nz-divider>
            <button nz-button nzType="primary" (click)="view(data)">view</button>
            </td>
          </tr>
        }
        </tbody>
      </nz-table>
  `,
  styles: ``
})
export class BookListComponent {

  
  title = '';
  author = '';
  isbn = '';

  store = inject(Store);
  books$ = this.store.select(BooksState.books);

  
  ngOnInit(): void {
    this.store.dispatch(new GetBooks());
  }

  add() {
    if (!this.title.trim() || !this.author.trim()) return;
    
  }


  view(book: Book) {
    console.log('[ __Selected Book__]:', book);
  }


  delete(id: number) {
    this.store.dispatch(new DeleteBook(id));
  }

}
