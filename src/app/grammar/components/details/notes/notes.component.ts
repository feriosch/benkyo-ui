import { Component, Input, OnInit } from '@angular/core';
import { Section } from 'src/models/responses/grammar/clause.model';

import { ExampleSentenceComponent } from '../example-sentence/example-sentence.component';

@Component({
  selector: 'app-clause-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  imports: [ExampleSentenceComponent],
})
export class NotesComponent implements OnInit {
  @Input()
  notes: Section[];

  constructor() {
    this.notes = [];
  }

  ngOnInit(): void {}
}
