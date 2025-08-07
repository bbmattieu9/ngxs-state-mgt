import { Injectable } from '@angular/core';
import { Book } from '../types/books.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }


  getBooks(): Observable<Book[]> {
    return of([]);
  }

  addBook(payload: Omit<Book, 'id'>): Observable<Book> {
    return of({ ...payload, id: 4 });
  }

  updateBook(book: Book): Observable<Book> {
    return of(book);
  }

  deleteBook(id: number): Observable<void> {
    return of(undefined);
  }
}