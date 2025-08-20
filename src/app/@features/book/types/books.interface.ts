export interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    isbn: string;
    price: number;
    published: string;
  }


  export interface BookFilter {
    title?: string;
    author?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }