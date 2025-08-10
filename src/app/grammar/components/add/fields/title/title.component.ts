import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MainForm } from 'src/models/grammar/forms/form';

@Component({
  selector: 'app-add-clause-form-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class AddClauseFormTitleComponent implements OnInit {
  @Input()
  formGroup?: FormGroup<MainForm>;

  constructor() {}

  get titleControl() {
    return this.formGroup!.get('title') as FormControl<string | null>;
  }

  get translationControl() {
    return this.formGroup!.get('translation') as FormControl<string | null>;
  }

  ngOnInit(): void {}
}
