import { Injectable } from '@angular/core';
import {
  DialogLayoutDisplay,
  ToastNotificationInitializer,
  ToastPositionEnum,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum,
} from '@costlydeveloper/ngx-awesome-popup';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  toastErrorNotification(error: string): void {
    const notification = new ToastNotificationInitializer();
    notification.setTitle('Error');
    notification.setMessage(`Error: ${error}`);

    notification.setConfig({
      autoCloseDelay: 5000,
      layoutType: DialogLayoutDisplay.DANGER,
      progressBar: ToastProgressBarEnum.NONE,
      toastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      toastPosition: ToastPositionEnum.TOP_RIGHT,
    });

    notification.openToastNotification$();
  }

  toastWordCreationNotification(collection: string): void {
    const notification = new ToastNotificationInitializer();
    notification.setTitle('Success!');
    notification.setMessage(`Word was created successfully in: ${collection}.`);

    notification.setConfig({
      autoCloseDelay: 3000,
      layoutType: DialogLayoutDisplay.SUCCESS,
      progressBar: ToastProgressBarEnum.NONE,
      toastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      toastPosition: ToastPositionEnum.TOP_CENTER,
    });

    notification.openToastNotification$();
  }

  toastWordUpdateNotification(word: string): void {
    const notification = new ToastNotificationInitializer();
    notification.setTitle('Success!');
    notification.setMessage(`${word} was edited successfully.`);

    notification.setConfig({
      autoCloseDelay: 3000,
      layoutType: DialogLayoutDisplay.SUCCESS,
      progressBar: ToastProgressBarEnum.NONE,
      toastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      toastPosition: ToastPositionEnum.TOP_CENTER,
    });

    notification.openToastNotification$();
  }

  toastClauseCreationNotification(): void {
    const notification = new ToastNotificationInitializer();
    notification.setTitle('Success!');
    notification.setMessage(`Clause was created successfully!.`);

    notification.setConfig({
      autoCloseDelay: 3000,
      layoutType: DialogLayoutDisplay.SUCCESS,
      progressBar: ToastProgressBarEnum.NONE,
      toastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      toastPosition: ToastPositionEnum.TOP_CENTER,
    });

    notification.openToastNotification$();
  }
}
