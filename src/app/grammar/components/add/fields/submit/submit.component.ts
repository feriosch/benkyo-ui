import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MainForm } from 'src/models/grammar/forms/form';

@Component({
  selector: 'app-add-clause-form-submit-button',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
})
export class AddClauseFormSubmitButtonComponent implements OnInit {
  @Input()
  formGroup?: FormGroup<MainForm>;

  @Input()
  isSubmitting?: boolean;

  constructor() {}

  ngOnInit(): void {}
}
