import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { MainForm, ExampleForm } from 'src/models/grammar/forms/form';

@Component({
  selector: 'app-add-clause-form-examples-field',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
})
export class AddClauseFormExamplesFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup<MainForm>;

  @Input()
  formArray?: FormArray<FormGroup<ExampleForm>>;

  constructor() {}

  ngOnInit(): void {}

  pushExample(): void {
    this.formArray!.push(
      new FormGroup<ExampleForm>({
        sentence: new FormControl<string | null>(null, [Validators.required]),
        translation: new FormControl<string | null>(null, [
          Validators.required,
        ]),
      }),
    );
  }

  popExample(): void {
    if (this.formArray!.length > 0) {
      this.formArray!.removeAt(this.formArray!.length - 1);
    }
  }
}
