import { Injectable } from '@angular/core';
import {
  DialogLayoutDisplay,
  ToastNotificationInitializer,
  ToastPositionEnum,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum,
} from '@costlydeveloper/ngx-awesome-popup';

@Injectable({ providedIn: 'root' })
export class GrammarNotificationService {
  toastClauseDeletionNotification(id: string): void {
    const notification = new ToastNotificationInitializer();

    notification.setTitle('Success!');
    notification.setMessage(`Clause was deleted successfully: ${id}.`);

    notification.setConfig({
      AutoCloseDelay: 2000,
      LayoutType: DialogLayoutDisplay.SUCCESS,
      ProgressBar: ToastProgressBarEnum.NONE,
      ToastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      ToastPosition: ToastPositionEnum.TOP_CENTER,
    });

    notification.openToastNotification$();
  }
}
