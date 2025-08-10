import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ExampleForm } from 'src/models/grammar/forms/form';

@Component({
  selector: 'app-add-clause-form-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class AddClauseFormSectionComponent implements OnInit {
  @Input()
  control?: AbstractControl;

  formGroup?: FormGroup;
  explanationControl?: FormControl;
  examplesArray?: FormArray<FormGroup<ExampleForm>>;

  constructor() {}

  ngOnInit(): void {
    this.formGroup = this.control! as FormGroup;
    this.explanationControl = this.control!.get('explanation') as FormControl;
    this.examplesArray = this.control!.get('examples') as FormArray<
      FormGroup<ExampleForm>
    >;
  }

  pushExample(): void {
    this.examplesArray!.push(
      new FormGroup<ExampleForm>({
        sentence: new FormControl<string | null>(null, [Validators.required]),
        translation: new FormControl<string | null>(null, [
          Validators.required,
        ]),
      }),
    );
  }

  popExample(): void {
    if (this.examplesArray!.length > 0) {
      this.examplesArray!.removeAt(this.examplesArray!.length - 1);
    }
  }
}
