import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss'],
})
export class AddClauseFormRelatedComponent implements OnInit {
  @Input()
  formGroup?: UntypedFormGroup;

  @Input()
  formArray?: UntypedFormArray;

  constructor() {}

  ngOnInit(): void {}

  pushRelated(): void {
    this.formArray!.push(
      new UntypedFormGroup({
        title: new UntypedFormControl(null, [Validators.required]),
        hiragana: new UntypedFormControl(null),
        reference: new UntypedFormControl(null),
        sections: new UntypedFormArray([]),
      })
    );
  }

  popRelated(): void {
    if (this.formArray!.length > 0)
      this.formArray!.removeAt(this.formArray!.length - 1);
  }

  getFormGroupFromControl(control: AbstractControl): UntypedFormGroup {
    return control as UntypedFormGroup;
  }

  getTitleControl(control: AbstractControl): UntypedFormControl {
    return control!.get('title') as UntypedFormControl;
  }

  getSectionsArray(control: AbstractControl): UntypedFormArray {
    return control!.get('sections') as UntypedFormArray;
  }

  pushSection(control: AbstractControl): void {
    this.getSectionsArray(control!).push(
      new UntypedFormGroup({
        explanation: new UntypedFormControl('', [Validators.required]),
        examples: new UntypedFormArray([]),
      })
    );
  }

  popSection(control: AbstractControl): void {
    if (this.getSectionsArray(control!).length > 0) {
      this.getSectionsArray(control!).removeAt(
        this.getSectionsArray(control!).length - 1
      );
    }
  }
}
