import { Component, OnInit, Input } from '@angular/core';
import { Formation } from 'src/models/responses/grammar/clause.model';

@Component({
  selector: 'app-clause-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'],
})
export class FormationsComponent implements OnInit {
  @Input()
  formations: Formation[];

  constructor() {
    this.formations = [];
  }

  ngOnInit(): void {}
}
