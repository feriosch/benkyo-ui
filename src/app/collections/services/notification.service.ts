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
      `Collection ${name} was created successfully. ID: ${id}.`,
    );

    notification.setConfig({
      autoCloseDelay: 5000,
      layoutType: DialogLayoutDisplay.SUCCESS,
      progressBar: ToastProgressBarEnum.NONE,
      toastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      toastPosition: ToastPositionEnum.TOP_CENTER,
    });

    notification.openToastNotification$();
  }

  toastCollectionCreationError(error: string): void {
    const notification = new ToastNotificationInitializer();
    notification.setTitle('Error creating collection');
    notification.setMessage(`Error: ${error}`);

    notification.setConfig({
      autoCloseDelay: 3000,
      layoutType: DialogLayoutDisplay.DANGER,
      progressBar: ToastProgressBarEnum.NONE,
      toastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      toastPosition: ToastPositionEnum.TOP_RIGHT,
    });

    notification.openToastNotification$();
  }
}
