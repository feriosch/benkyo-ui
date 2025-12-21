import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  VocabularyMainForm,
  VocabularySentenceForm,
} from 'src/models/vocabulary/forms/form.model';
import { NgFor, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-word-form-sentences-field',
  templateUrl: './sentences.component.html',
  styleUrls: ['./sentences.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgClass, NgIf],
})
export class AddWordFormSentencesFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup<VocabularyMainForm>;

  @Input()
  formArray?: FormArray<FormGroup<VocabularySentenceForm>>;

  constructor() {}

  get controls() {
    return this.formArray!.controls;
  }

  ngOnInit(): void {}

  pushSentence(): void {
    this.formArray!.push(
      new FormGroup<VocabularySentenceForm>({
        japanese: new FormControl<string | null>(null, [Validators.required]),
        translation: new FormControl<string | null>(null, [
          Validators.required,
        ]),
      }),
    );
  }

  popSentence(): void {
    if (this.formArray!.length > 0) {
      this.formArray!.removeAt(this.formArray!.length - 1);
    }
  }

  isControlInvalid(name: string, index: number): boolean {
    const control: FormControl<string | null> = this.controls[index].get(
      name,
    )! as FormControl<string | null>;
    return control.touched && control.invalid;
  }
}
