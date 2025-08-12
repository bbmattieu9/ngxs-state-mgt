import { inject, Injectable } from '@angular/core';
import { Book } from '../types/books.interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  _httpMessenger = inject(HttpClient);
  private readonly ASSET_URL = 'books.json';


  getBooks(): Observable<Book[]> {
    return this._httpMessenger.get<Book[]>(this.ASSET_URL);
  }

  addBook(payload: Omit<Book, 'id'>): Observable<Book> {
    const newBook: Book = { ...payload, id: Math.floor(Math.random() * 1000) + 5 };
    console.log('[ __Simulating addBook__ ]:', newBook);
    return of(newBook);
  }

  updateBook(book: Book): Observable<Book> {
    console.log('[ __Simulating updateBook__ ]:', book);
    return of(book)
  }

  deleteBook(id: number): Observable<void> {
    return of(undefined);
  }
}