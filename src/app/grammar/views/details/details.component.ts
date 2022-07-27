import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FullClause } from 'src/models/responses/grammar/clause.model';
import { Views } from 'src/models/responses/grammar/details.model';
import { GrammarService } from 'src/app/grammar/services/grammar.service';

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
    private grammarService: GrammarService
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

  onClickDropdown(section: string) {
    this.views[section as keyof Views] = !this.views[section as keyof Views];
  }

  async onClickBack() {
    await this.router.navigateByUrl('/grammar');
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
}
