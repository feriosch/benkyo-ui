import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FullClause } from 'src/models/responses/grammar/clause.model';
import { GrammarService } from '../../services/grammar.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditClauseViewComponent implements OnInit {
  id: string;
  isLoading: boolean;
  originalClause?: FullClause | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private grammarService: GrammarService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.grammarService.getFullClauseById(this.id).subscribe((response) => {
      this.isLoading = false;
      this.originalClause = response;
    });
  }

  async onClickCancel() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }
}
