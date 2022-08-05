import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationService } from 'src/app/shared/notification.service';
import { GrammarService } from 'src/app/grammar/services/grammar.service';
import { GrammarNotificationService } from 'src/app/grammar/services/notification.service';

@Component({
  selector: 'app-delete-clause-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteClauseModalComponent implements OnInit {
  @Input()
  id?: string;

  isActive: boolean;

  constructor(
    private router: Router,
    private grammarService: GrammarService,
    private grammarNotificationService: GrammarNotificationService,
    private notificationService: NotificationService
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
    this.grammarService.deleteClause(this.id!).subscribe(
      (_response) => {
        this.router.navigateByUrl('/grammar');
        this.grammarNotificationService.toastClauseDeletionNotification(
          this.id!
        );
      },
      (error) => {
        console.log(error)
        this.notificationService.toastErrorNotification(error);
      }
    );
  }
}
