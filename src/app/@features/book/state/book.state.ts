import { Injectable, inject } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Book } from '../types/books.interface';
import {
  GetBooks,
  AddBook,
  UpdateBook,
  DeleteBook,
} from '../actions/book.actions';
import { BookService } from '../data-access/book.service';

export interface BooksStateModel {
  books: Book[];
}

@State<BooksStateModel>({
  name: 'books', // name of the state slice (Initial State)
  defaults: {
    books: [],
  },
})
@Injectable()
export class BooksState {
  bookSrv = inject(BookService);

  @Selector()
  static books(state: BooksStateModel) {
    return state.books;
  }

  // Actions
  @Action(GetBooks)
  getBooks(ctx: StateContext<BooksStateModel>) {
    return this.bookSrv.getBooks().pipe(
      tap((books) => {
        ctx.patchState({ books });
      })
    );
  }

  @Action(AddBook)
  addBook(ctx: StateContext<BooksStateModel>, { payload }: AddBook) {
    return this.bookSrv.addBook(payload).pipe(
      tap((newBook) => {
        const state = ctx.getState();
        ctx.patchState({ books: [...state.books, newBook] });
      })
    );
  }

  @Action(UpdateBook)
  updateBook(ctx: StateContext<BooksStateModel>, { payload }: UpdateBook) {
    return this.bookSrv.updateBook(payload).pipe(
      tap((updatedBook) => {
        const state = ctx.getState();
        const updatedBooks = state.books.map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        );
        ctx.patchState({ books: updatedBooks });
      })
    );
  }

  @Action(DeleteBook)
  deleteBook(ctx: StateContext<BooksStateModel>, { id }: DeleteBook) {
    return this.bookSrv.deleteBook(id).pipe(
      tap(() => {
        const state = ctx.getState();
        ctx.patchState({ books: state.books.filter((book) => book.id !== id) });
      })
    );
  }
}
