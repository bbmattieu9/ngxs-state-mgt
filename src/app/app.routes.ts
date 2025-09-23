import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [

  {
    path: 'auth',
    loadChildren: () =>
      import('./@auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'books',
    loadChildren: () => import('./@features/book/book.routes').then(m => m.BOOK_ROUTES)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];



