import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FullClause } from 'src/models/responses/grammar/clause.model';
import { GrammarService } from '../grammar.service';

@Component({
  selector: 'app-clause-details',
  templateUrl: './clause-details.component.html',
  styleUrls: ['./clause-details.component.scss']
})
export class ClauseDetailsComponent implements OnInit {

  id: string;
  clause?: FullClause | null;
  tags: string[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private grammarService: GrammarService,
  ) { 
    this.id = this.route.snapshot.params['id'];
    this.tags = [];
  }

  async onClickBack() {
    await this.router.navigateByUrl('/grammar');
  }

  ngOnInit(): void {
    this.grammarService.getFullClauseById(this.id)
      .subscribe((response) => {
        this.clause = response;
        if (this.clause?.tags) {
          for (const [key] of Object.entries(this.clause?.tags)) {
            this.tags.push(key);
          }
        }
      });
  }

  debug() {
    return JSON.stringify(this.clause)
  }

}
