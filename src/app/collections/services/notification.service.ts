import { Injectable } from '@angular/core';
import {
  DialogLayoutDisplay,
  ToastNotificationInitializer,
  ToastPositionEnum,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum,
} from '@costlydeveloper/ngx-awesome-popup';

@Injectable({ providedIn: 'root' })
export class CollectionNotificationService {
  toastCollectionCreationSuccess(name: string, id: string): void {
    const notification = new ToastNotificationInitializer();

    notification.setTitle('Success!');
    notification.setMessage(
      `Collection ${name} was created successfully. ID: ${id}.`
    );

    notification.setConfig({
      AutoCloseDelay: 5000,
      LayoutType: DialogLayoutDisplay.SUCCESS,
      ProgressBar: ToastProgressBarEnum.NONE,
      ToastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      ToastPosition: ToastPositionEnum.TOP_CENTER,
    });

    notification.openToastNotification$();
  }

  toastCollectionCreationError(error: string): void {
    const notification = new ToastNotificationInitializer();
    notification.setTitle('Error creating collection');
    notification.setMessage(`Error: ${error}`);

    notification.setConfig({
      AutoCloseDelay: 3000,
      LayoutType: DialogLayoutDisplay.DANGER,
      ProgressBar: ToastProgressBarEnum.NONE,
      ToastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      ToastPosition: ToastPositionEnum.TOP_RIGHT,
    });

    notification.openToastNotification$();
  }
}
