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
      autoCloseDelay: 3000,
      layoutType: DialogLayoutDisplay.SUCCESS,
      progressBar: ToastProgressBarEnum.NONE,
      toastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      toastPosition: ToastPositionEnum.TOP_CENTER,
    };

    this.errorConfig = {
      autoCloseDelay: 5000,
      layoutType: DialogLayoutDisplay.DANGER,
      progressBar: ToastProgressBarEnum.NONE,
      toastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      toastPosition: ToastPositionEnum.TOP_RIGHT,
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
