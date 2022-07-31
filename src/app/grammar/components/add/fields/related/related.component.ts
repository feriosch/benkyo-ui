import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss'],
})
export class AddClauseFormRelatedComponent implements OnInit {
  form?: FormGroup;
  formGroup?: FormGroup;
  formArray?: FormArray;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control as FormGroup;
    this.formGroup = this.form.get('related') as FormGroup;
    this.formArray = this.form.get('related') as FormArray;
  }

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
    if (this.formArray!.length > 0) {
      this.formArray!.removeAt(this.formArray!.length - 1);
    }
  }

  getFormGroupControl(control: AbstractControl): FormGroup {
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
