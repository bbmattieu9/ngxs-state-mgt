import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { delay, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { SKIP_GLOBAL_SPINNER } from '../util/http-constants';
import { LoadingService } from '../services/loading.service';


const DELAY_MS = 3000;

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const loadingSrv = inject(LoadingService);

  // If request opts out, don't toggle the global spinner
  if (req.context.get(SKIP_GLOBAL_SPINNER)) {
    return next(req);
  }

  loadingSrv.loadingOn();

  return next(req).pipe(
    delay(DELAY_MS),
    finalize(() => {
      loadingSrv.loadingOff();
    })
  );
};
