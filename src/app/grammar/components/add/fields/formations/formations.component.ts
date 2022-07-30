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
  selector: 'app-add-clause-form-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'],
})
export class AddClauseFormFormationsComponent implements OnInit {
  form?: FormGroup;
  formationsFormArray?: FormArray;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control as FormGroup;
    this.formationsFormArray = this.rootFormGroup.control.get(
      'formations'
    ) as FormArray;
  }

  getFormGroupControl(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  getExampleArrayControls(control: AbstractControl): FormArray {
    return control!.get('examples') as FormArray;
  }

  pushFormation(): void {
    this.formationsFormArray!.push(
      new FormGroup({
        rule: new FormControl('', [Validators.required]),
        examples: new FormArray([]),
      })
    );
  }

  popFormation(): void {
    if (this.formationsFormArray!.length > 0) {
      this.formationsFormArray!.removeAt(this.formationsFormArray!.length - 1);
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
