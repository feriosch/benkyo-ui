import { Component, OnInit, Input } from '@angular/core';
import { Formation } from 'src/models/responses/grammar/clause.model';

import { ExampleSentenceComponent } from '../example-sentence/example-sentence.component';

@Component({
  selector: 'app-clause-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'],
  imports: [ExampleSentenceComponent],
})
export class FormationsComponent implements OnInit {
  @Input()
  formations: Formation[];

  constructor() {
    this.formations = [];
  }

  ngOnInit(): void {}
}
