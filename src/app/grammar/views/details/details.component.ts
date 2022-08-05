import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FullClause } from 'src/models/responses/grammar/clause.model';
import { Views } from 'src/models/responses/grammar/details.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { GrammarService } from 'src/app/grammar/services/grammar.service';
import { GrammarNotificationService } from 'src/app/grammar/services/notification.service';

@Component({
  selector: 'app-clause-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class ClauseDetailsComponent implements OnInit {
  id: string;
  clause?: FullClause | null;
  tags: string[];
  views: Views;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private grammarService: GrammarService,
    private grammarNotificationService: GrammarNotificationService,
    private notificationService: NotificationService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.tags = [];
    this.views = {
      keys: true,
      formations: true,
      examples: true,
      notes: true,
      related: true,
    };
  }

  ngOnInit(): void {
    this.grammarService.getFullClauseById(this.id).subscribe((response) => {
      this.clause = response;
      if (this.clause!.tags) {
        for (const [key] of Object.entries(this.clause!.tags)) {
          this.tags.push(key);
        }
      }
    });
  }

  onClickDropdown(section: string) {
    this.views[section as keyof Views] = !this.views[section as keyof Views];
  }

  async onClickBack() {
    await this.router.navigateByUrl('/grammar');
  }

  async onClickEdit() {
    await this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onClickDelete() {
    this.grammarService.deleteClause(this.id).subscribe(
      (_response) => {
        this.router.navigateByUrl('/grammar');
        this.grammarNotificationService.toastClauseDeletionNotification(
          this.id
        );
      },
      (error) => {
        this.notificationService.toastErrorNotification(error);
      }
    );
  }
}
