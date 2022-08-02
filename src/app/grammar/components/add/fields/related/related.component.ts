import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss'],
})
export class AddClauseFormRelatedComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  @Input()
  formArray?: FormArray;

  constructor() {}

  ngOnInit(): void {}

  pushRelated(): void {
    this.formArray!.push(
      new FormGroup({
        title: new FormControl(null, [Validators.required]),
        hiragana: new FormControl(null),
        reference: new FormControl(null),
        sections: new FormArray([]),
      })
    );
  }

  popRelated(): void {
    if (this.formArray!.length > 0)
      this.formArray!.removeAt(this.formArray!.length - 1);
  }

  getFormGroupFromControl(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  getTitleControl(control: AbstractControl): FormControl {
    return control!.get('title') as FormControl;
  }

  getSectionsArray(control: AbstractControl): FormArray {
    return control!.get('sections') as FormArray;
  }

  pushSection(control: AbstractControl): void {
    this.getSectionsArray(control!).push(
      new FormGroup({
        explanation: new FormControl('', [Validators.required]),
        examples: new FormArray([]),
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
