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
  selector: 'app-add-clause-form-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class AddClauseFormNotesComponent implements OnInit {
  form?: FormGroup;
  sectionsFormArray?: FormArray;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control as FormGroup;
    this.sectionsFormArray = this.rootFormGroup.control.get(
      'notes'
    ) as FormArray;
  }

  getFormGroupControl(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  getExampleArrayControls(control: AbstractControl): FormArray {
    return control!.get('examples') as FormArray;
  }

  pushSection(): void {
    this.sectionsFormArray!.push(
      new FormGroup({
        explanation: new FormControl('', [Validators.required]),
        examples: new FormArray([]),
      })
    );
  }

  popSection(): void {
    if (this.sectionsFormArray!.length > 0) {
      this.sectionsFormArray!.removeAt(this.sectionsFormArray!.length - 1);
    }
  }

  pushExample(control: AbstractControl): void {
    let examplesFormArray: FormArray;
    examplesFormArray = this.getFormGroupControl(control).get(
      'examples'
    ) as FormArray;
    examplesFormArray!.push(
      new FormGroup({
        sentence: new FormControl('', [Validators.required]),
        translation: new FormControl('', [Validators.required]),
      })
    );
  }

  popExample(control: AbstractControl): void {
    let examplesFormArray: FormArray;
    examplesFormArray = this.getFormGroupControl(control!).get(
      'examples'
    ) as FormArray;
    if (examplesFormArray!.length > 0) {
      examplesFormArray!.removeAt(examplesFormArray!.length - 1);
    }
  }
}
