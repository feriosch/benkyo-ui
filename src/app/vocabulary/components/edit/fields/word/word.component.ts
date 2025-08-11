import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { VocabularyMainForm } from 'src/models/vocabulary/forms/form.model';

@Component({
  selector: 'app-edit-word-form-word-field',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class EditWordFormWordFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup<VocabularyMainForm>;

  @Input()
  word?: string;

  constructor() {}

  get spanishControl(): FormControl {
    return this.formGroup!.get('spanish') as FormControl;
  }

  get isSpanishNDisabled(): boolean {
    return this.spanishControl.value === null;
  }

  addSpanishN() {
    this.spanishControl.patchValue(this.spanishControl.value + 'ñ');
  }

  ngOnInit(): void {}
}
