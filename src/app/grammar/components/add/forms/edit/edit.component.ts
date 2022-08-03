import { Component, Input, OnInit } from '@angular/core';

import { FullClause } from 'src/models/responses/grammar/clause.model';

@Component({
  selector: 'app-edit-clause-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditClauseFormComponent implements OnInit {
  @Input()
  clause?: FullClause;

  constructor() {}

  ngOnInit(): void {}
}
