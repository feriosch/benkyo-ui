import { Component, Input, OnInit } from '@angular/core';
import { Related } from 'src/models/responses/grammar/clause.model';
import { NgFor, NgIf } from '@angular/common';
import { ExampleSentenceComponent } from '../example-sentence/example-sentence.component';

@Component({
  selector: 'app-clause-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss'],
  imports: [NgFor, NgIf, ExampleSentenceComponent],
})
export class RelatedComponent implements OnInit {
  @Input()
  related: Related[];

  constructor() {
    this.related = [];
  }

  ngOnInit(): void {}
}
