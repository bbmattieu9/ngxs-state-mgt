import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    {
      path: 'books',
      loadChildren: () => import('./@features/book/book.routes').then(m => m.BOOK_ROUTES)
    },
    {
      path: '',
      redirectTo: 'books',
      pathMatch: 'full'
    }
  ];