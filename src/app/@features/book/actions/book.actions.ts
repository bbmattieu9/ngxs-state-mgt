import { Book, BookFilter } from "../types/books.interface";

export class GetBooks {
    static readonly type = '[Books] Get All';
  }

  export class SetBookFilters {
    static readonly type = '[Books] Set Filters';
    constructor(public filters: Partial<BookFilter>) {}
  }

  export class AddBook {
    static readonly type = '[Books] Add';
    constructor(public payload: Omit<Book, 'id'>) {}
  }

  export class UpdateBook {
    static readonly type = '[Books] Update';
    constructor(public payload: Book) {}
  }

  export class DeleteBook {
    static readonly type = '[Books] Delete';
    constructor(public id: number) {}
  }