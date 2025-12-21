import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VocabularyMainForm } from 'src/models/vocabulary/forms/form.model';

@Component({
  selector: 'app-add-word-form-submit-field',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
  imports: [FormsModule, ReactiveFormsModule],
})
export class AddWordFormSubmitFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup<VocabularyMainForm>;

  constructor() {}

  ngOnInit(): void {}
}
