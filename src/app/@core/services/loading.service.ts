import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {


  private counter = 0;
  private _loading$ = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading$.asObservable();


  loadingOn(): void {
    this.counter++;
    if (this.counter === 1) {
      this._loading$.next(true);
    }
  }

  loadingOff(): void {
    if (this.counter <= 0) return;
    this.counter--;
    if (this.counter === 0) {
      this._loading$.next(false);
    }
  }

  reset(): void {
    this.counter = 0;
    this._loading$.next(false);
  }
}
