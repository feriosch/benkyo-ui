import { Component, Input, OnInit } from '@angular/core';
import { Example } from 'src/models/responses/grammar/clause.model';

@Component({
  selector: 'app-clause-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
})
export class ExamplesComponent implements OnInit {
  @Input()
  examples: Example[];

  constructor() {
    this.examples = [];
  }

  ngOnInit(): void {}
}
