import { Component, Input, OnInit } from '@angular/core';
import { Related } from 'src/models/responses/grammar/clause.model';

@Component({
  selector: 'app-clause-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss'],
})
export class RelatedComponent implements OnInit {
  @Input()
  related: Related[];

  constructor() {
    this.related = [];
  }

  ngOnInit(): void {}
}
