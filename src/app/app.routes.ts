import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
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
