import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationService } from '../../../../shared/notification.service';
import { VocabularyService } from '../../../services/vocabulary.service';
import { VocabularyNotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-word-details-delete-modal',
  templateUrl: './delete-modal.component.html',
})
export class WordDetailsDeleteModalComponent implements OnInit {
  @Input() id!: string;
  @Input() word?: string;
  isActive: boolean;

  constructor(
    private router: Router,
    private vocabularyService: VocabularyService,
    private vocabularyNotificationService: VocabularyNotificationService,
    private notificationService: NotificationService,
  ) {
    this.isActive = false;
  }

  ngOnInit(): void {}

  openModal(): void {
    this.isActive = true;
  }

  closeModal(): void {
    this.isActive = false;
  }

  onClickDelete() {
    this.vocabularyService.deleteWord(this.id).subscribe(
      (_response) => {
        this.router.navigateByUrl('/vocabulary').then(() => {
          this.vocabularyNotificationService.toastWordDeletionNotification(
            this.id,
            this.word,
          );
        });
      },
      (error) => {
        this.notificationService.toastErrorNotification(error);
      },
    );
  }
}
