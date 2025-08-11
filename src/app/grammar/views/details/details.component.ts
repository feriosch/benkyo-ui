import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FullClause } from 'src/models/responses/grammar/clause.model';
import { Views } from 'src/models/responses/grammar/details.model';
import { GrammarService } from '../../services/grammar.service';
import { DeleteClauseModalComponent } from '../../components/details/delete-modal/delete-modal.component';

@Component({
  selector: 'app-clause-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class ClauseDetailsComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal!: DeleteClauseModalComponent;

  // TODO: Loading is not working as expected
  isLoading: boolean;
  id: string;
  clause?: FullClause | null;
  tags: string[];
  views: Views;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private grammarService: GrammarService,
  ) {
    this.isLoading = true;
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
    this.isLoading = true;
    this.grammarService.getFullClauseById(this.id).subscribe((response) => {
      this.clause = response;
      this.isLoading = false;
      if (this.clause!.tags) {
        for (const [key] of Object.entries(this.clause!.tags))
          this.tags.push(key);
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
    this.deleteModal.openModal();
  }
}
