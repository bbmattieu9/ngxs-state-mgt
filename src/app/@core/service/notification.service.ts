import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

enum NOTIFIER {
  SUCCESS_MSG = 'Resource Created Successfully!',
  TITLE = 'Success',
  TYPE = 'success',
}

enum WARNING_NOTIFIER {
  TITLE = 'ACTION FEEDBACK',
  TYPE = 'warning',
}

enum ERROR_NOTIFIER {
  TITLE = 'ACTION FEEDBACK',
  TYPE = 'error',
  ERROR_MSG = "Couldn't Create Resource, Try Again!",
}

enum CUSTOM_ERROR_NOTIFIER {
  TITLE = 'ERROR',
  TYPE = 'error',
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notification: NzNotificationService) {}

  successNotification(): void {
    this.notification.create(
      NOTIFIER.TYPE,
      NOTIFIER.TITLE,
      NOTIFIER.SUCCESS_MSG
    );
  }

  infoNotification(message: string): void {
    this.notification.create(
      WARNING_NOTIFIER.TYPE,
      WARNING_NOTIFIER.TITLE,
      message
    );
  }

  errorNotification(): void {
    this.notification.create(
      ERROR_NOTIFIER.TYPE,
      ERROR_NOTIFIER.TITLE,
      ERROR_NOTIFIER.ERROR_MSG
    );
  }

  customSuccessNotification(title: string, succMsg: string) {
    this.notification.create(NOTIFIER.TYPE, title, succMsg);
  }

  customErrorNotifiction(errMsg: string) {
    this.notification.create(
      CUSTOM_ERROR_NOTIFIER.TYPE,
      CUSTOM_ERROR_NOTIFIER.TITLE,
      errMsg
    );
  }
}
