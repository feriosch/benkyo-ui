import { Injectable } from '@angular/core'
import {
  DialogLayoutDisplay,
  ToastNotificationInitializer,
  ToastPositionEnum,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum
} from '@costlydeveloper/ngx-awesome-popup';


@Injectable({ providedIn: 'root' })
export class NotificationService {

  toastErrorNotification(error: string): void {
    const notification = new ToastNotificationInitializer();
    notification.setTitle('Error');
    notification.setMessage(`Error: ${error}`);

    notification.setConfig({
      AutoCloseDelay: 5000,
      LayoutType: DialogLayoutDisplay.DANGER,
      ProgressBar: ToastProgressBarEnum.NONE,
      ToastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      ToastPosition: ToastPositionEnum.TOP_RIGHT
    })

    notification.openToastNotification$();
  }

  toastWordCreationNotification(collection: string): void {
    const notification = new ToastNotificationInitializer();
    notification.setTitle('Success!');
    notification.setMessage(`Word was created successfully in: ${collection}.`);

    notification.setConfig({
      AutoCloseDelay: 3000,
      LayoutType: DialogLayoutDisplay.SUCCESS,
      ProgressBar: ToastProgressBarEnum.NONE,
      ToastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      ToastPosition: ToastPositionEnum.TOP_CENTER
    })

    notification.openToastNotification$();
  };

  toastWordUpdateNotification(word: string): void {
    const notification = new ToastNotificationInitializer();
    notification.setTitle('Success!');
    notification.setMessage(`${word} was edited successfully.`);

    notification.setConfig({
      AutoCloseDelay: 3000,
      LayoutType: DialogLayoutDisplay.SUCCESS,
      ProgressBar: ToastProgressBarEnum.NONE,
      ToastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      ToastPosition: ToastPositionEnum.TOP_CENTER
    })

    notification.openToastNotification$();
  };

}
