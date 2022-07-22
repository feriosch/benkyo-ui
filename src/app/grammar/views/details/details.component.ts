import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FullClause } from 'src/models/responses/grammar/clause.model';
import { ClauseTypeMapperService } from 'src/app/grammar/services/clause-type-mapper.service';
import { GrammarService } from 'src/app/grammar/services/grammar.service';

@Component({
  selector: 'app-clause-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class ClauseDetailsComponent implements OnInit {
  id: string;
  clause?: FullClause | null;
  fullType?: string
  tags: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private grammarService: GrammarService,
    private typeMapperService: ClauseTypeMapperService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.tags = [];
  }

  async onClickBack() {
    await this.router.navigateByUrl('/grammar');
  }

  ngOnInit(): void {
    this.grammarService.getFullClauseById(this.id).subscribe((response) => {
      this.clause = response;
      this.fullType = this.typeMapperService.getFullType(this.clause!.type)
      console.log(this.clause)
      if (this.clause!.tags) {
        for (const [key] of Object.entries(this.clause!.tags)) {
          this.tags.push(key);
        }
      }
    });
  }

  debug() {
    return JSON.stringify(this.clause);
  }
}
