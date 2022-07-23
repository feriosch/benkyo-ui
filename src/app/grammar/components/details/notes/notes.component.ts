import { Component, Input, OnInit } from '@angular/core';
import { Section } from 'src/models/responses/grammar/clause.model';

@Component({
  selector: 'app-clause-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  @Input()
  notes: Section[];

  constructor() {
    this.notes = [];
  }

  ngOnInit(): void {}
}
