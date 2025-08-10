import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  MainForm,
  ExampleForm,
  FormationForm,
} from 'src/models/grammar/forms/form';

@Component({
  selector: 'app-add-clause-form-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'],
})
export class AddClauseFormFormationsComponent implements OnInit {
  @Input()
  formGroup?: FormGroup<MainForm>;

  @Input()
  formArray?: FormArray<FormGroup<FormationForm>>;

  constructor() {}

  ngOnInit(): void {}

  getFormGroupFromControl(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  getExamplesFormArray(
    control: AbstractControl,
  ): FormArray<FormGroup<ExampleForm>> {
    return control!.get('examples') as FormArray<FormGroup<ExampleForm>>;
  }

  pushFormation(): void {
    this.formArray!.push(
      new FormGroup<FormationForm>({
        rule: new FormControl<string | null>(null, [Validators.required]),
        examples: new FormArray<FormGroup<ExampleForm>>([]),
      }),
    );
  }

  popFormation(): void {
    if (this.formArray!.length > 0)
      this.formArray!.removeAt(this.formArray!.length - 1);
    ``;
  }

  pushExample(control: AbstractControl): void {
    this.getExamplesFormArray(control)!.push(
      new FormGroup<ExampleForm>({
        sentence: new FormControl<string | null>(null, [Validators.required]),
        translation: new FormControl<string | null>(null, [
          Validators.required,
        ]),
      }),
    );
  }

  popExample(control: AbstractControl): void {
    const examplesFormArray: FormArray<FormGroup<ExampleForm>> =
      this.getExamplesFormArray(control)!;
    if (examplesFormArray!.length > 0) {
      examplesFormArray!.removeAt(examplesFormArray!.length - 1);
    }
  }
}
