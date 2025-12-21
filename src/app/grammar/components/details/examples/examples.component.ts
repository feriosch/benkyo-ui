import { Component, Input, OnInit } from '@angular/core';
import { Example } from 'src/models/responses/grammar/clause.model';
import { NgFor } from '@angular/common';
import { ExampleSentenceComponent } from '../example-sentence/example-sentence.component';

@Component({
  selector: 'app-clause-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  imports: [NgFor, ExampleSentenceComponent],
})
export class ExamplesComponent implements OnInit {
  @Input()
  examples: Example[];

  constructor() {
    this.examples = [];
  }

  ngOnInit(): void {}
}
