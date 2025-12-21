import { Component, OnInit } from '@angular/core';
import { AddClauseFormComponent } from '../../components/add/forms/add/add-form.component';

@Component({
  selector: 'app-add-clause-view',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  imports: [AddClauseFormComponent],
})
export class GrammarAddViewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
