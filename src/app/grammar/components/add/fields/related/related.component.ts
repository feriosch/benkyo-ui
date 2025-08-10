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
  RelatedSectionForm,
  RelatedForm,
} from 'src/models/grammar/forms/form';

@Component({
  selector: 'app-add-clause-form-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss'],
})
export class AddClauseFormRelatedComponent implements OnInit {
  @Input()
  formGroup?: FormGroup<MainForm>;

  @Input()
  formArray?: FormArray<FormGroup<RelatedForm>>;

  constructor() {}

  ngOnInit(): void {}

  pushRelated(): void {
    this.formArray!.push(
      new FormGroup<RelatedForm>({
        title: new FormControl<string | null>(null, [Validators.required]),
        hiragana: new FormControl<string | null>(null),
        reference: new FormControl<string | null>(null),
        sections: new FormArray<FormGroup<RelatedSectionForm>>([]),
      }),
    );
  }

  popRelated(): void {
    if (this.formArray!.length > 0)
      this.formArray!.removeAt(this.formArray!.length - 1);
  }

  getFormGroupFromControl(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  getTitleControl(control: AbstractControl): FormControl<string | null> {
    return control!.get('title') as FormControl<string | null>;
  }

  getSectionsArray(
    control: AbstractControl,
  ): FormArray<FormGroup<RelatedSectionForm>> {
    return control!.get('sections') as FormArray<FormGroup<RelatedSectionForm>>;
  }

  pushSection(control: AbstractControl): void {
    this.getSectionsArray(control!).push(
      new FormGroup<RelatedSectionForm>({
        explanation: new FormControl<string | null>(null, [
          Validators.required,
        ]),
        examples: new FormArray<FormGroup<ExampleForm>>([]),
      }),
    );
  }

  popSection(control: AbstractControl): void {
    if (this.getSectionsArray(control!).length > 0) {
      this.getSectionsArray(control!).removeAt(
        this.getSectionsArray(control!).length - 1,
      );
    }
  }
}
