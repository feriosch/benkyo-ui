import { Injectable } from '@angular/core';
import {
  DialogLayoutDisplay,
  IToastCoreConfig,
  ToastNotificationInitializer,
  ToastPositionEnum,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum,
} from '@costlydeveloper/ngx-awesome-popup';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private successConfig: IToastCoreConfig;
  private errorConfig: IToastCoreConfig;

  constructor() {
    this.successConfig = {
      AutoCloseDelay: 3000,
      LayoutType: DialogLayoutDisplay.SUCCESS,
      ProgressBar: ToastProgressBarEnum.NONE,
      ToastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      ToastPosition: ToastPositionEnum.TOP_CENTER,
    };

    this.errorConfig = {
      AutoCloseDelay: 5000,
      LayoutType: DialogLayoutDisplay.DANGER,
      ProgressBar: ToastProgressBarEnum.NONE,
      ToastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      ToastPosition: ToastPositionEnum.TOP_RIGHT,
    };
  }

  toastSuccess(message: string): void {
    const notification: ToastNotificationInitializer =
      new ToastNotificationInitializer();
    notification.setTitle('Success!');
    notification.setMessage(message);
    notification.setConfig(this.successConfig);
    notification.openToastNotification$();
  }

  toastError(message: string): void {
    const notification: ToastNotificationInitializer =
      new ToastNotificationInitializer();
    notification.setTitle('Error!');
    notification.setMessage(message);
    notification.setConfig(this.errorConfig);
    notification.openToastNotification$();
  }
}
