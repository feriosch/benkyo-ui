import { Injectable } from '@angular/core';
import {
  DialogLayoutDisplay,
  ToastNotificationInitializer,
  ToastPositionEnum,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum,
} from '@costlydeveloper/ngx-awesome-popup';

@Injectable({ providedIn: 'root' })
export class VocabularyNotificationService {
  toastWordDeletionNotification(id: string, word?: string): void {
    const notification = new ToastNotificationInitializer();

    notification.setTitle('Success!');
    if (word) notification.setMessage(`Word deleted: ${word}.`);
    else notification.setMessage(`Word deleted (id): ${id}.`);

    notification.setConfig({
      autoCloseDelay: 2000,
      layoutType: DialogLayoutDisplay.SUCCESS,
      progressBar: ToastProgressBarEnum.NONE,
      toastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      toastPosition: ToastPositionEnum.TOP_CENTER,
    });

    notification.openToastNotification$();
  }
}
