import { Injectable } from '@angular/core';
import { AUTH_KEYS } from '../../@shared/constants/auth.keys';



@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

 protected getItem<T = string  | {}>(key: string): T | null {
  const data = localStorage.getItem(key);

  if (data != null) {
    try {
      return JSON.parse(data);
    } catch {
      return data as unknown as T;
    }
  }

  return null;
}


 protected setItem(key: string, data: object | string) {
  const value = typeof data === 'string' ? data : JSON.stringify(data);
  localStorage.setItem(key, value);
}

  protected removeItem(key: string) {
    localStorage.removeItem(key);
  }

  protected clearCache() {
    Object.values(AUTH_KEYS).forEach((key) => localStorage.removeItem(key));
  }

  protected clear() {
    localStorage.clear();
  }


}
