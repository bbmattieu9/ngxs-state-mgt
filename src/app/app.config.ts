import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';

import { APP_ROUTES } from './app.routes';
import { BooksState } from './@features/book/state/book.state';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './@core/interceptors/loading.interceptor';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NgIdleModule } from '@ng-idle/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';


registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  
    provideRouter(APP_ROUTES),
    provideStore([BooksState]),
    provideAnimations(),
    importProvidersFrom(NzModalModule, NzDrawerModule, NgIdleModule.forRoot(),
    NzProgressModule),
    provideHttpClient(
      withInterceptors([loadingInterceptor])
    ), 
    provideNzIcons(icons), provideNzI18n(en_US), importProvidersFrom(FormsModule), provideAnimationsAsync(),
  ]
};
