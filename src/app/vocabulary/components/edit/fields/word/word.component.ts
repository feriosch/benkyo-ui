import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { VocabularyMainForm } from 'src/models/vocabulary/forms/form.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-edit-word-form-word-field',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, NgClass],
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
