import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VocabularyMainForm } from 'src/models/vocabulary/forms/form.model';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-word-form-word-field',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf],
})
export class AddWordFormWordFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup<VocabularyMainForm>;

  constructor() {}

  get wordControl() {
    return this.formGroup!.get('word');
  }

  isWordRepeated(): boolean {
    if (this.wordControl!.errors) {
      return this.wordControl!.errors!.hasOwnProperty('repeatedWord');
    }
    return false;
  }

  ngOnInit(): void {}
}
