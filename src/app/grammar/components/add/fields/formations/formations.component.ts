import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'],
})
export class AddClauseFormFormationsComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  @Input()
  formArray?: FormArray;

  constructor() {}

  ngOnInit(): void {}

  getFormGroupFromControl(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  getExamplesFormArray(control: AbstractControl): FormArray {
    return control!.get('examples') as FormArray;
  }

  pushFormation(): void {
    this.formArray!.push(
      new FormGroup({
        rule: new FormControl(null, [Validators.required]),
        examples: new FormArray([]),
      })
    );
  }

  popFormation(): void {
    if (this.formArray!.length > 0)
      this.formArray!.removeAt(this.formArray!.length - 1);
  }

  pushExample(control: AbstractControl): void {
    this.getExamplesFormArray(control)!.push(
      new FormGroup({
        sentence: new FormControl('', [Validators.required]),
        translation: new FormControl('', [Validators.required]),
      })
    );
  }

  popExample(control: AbstractControl): void {
    const examplesFormArray: FormArray = this.getExamplesFormArray(control)!;
    if (examplesFormArray!.length > 0) {
      examplesFormArray!.removeAt(examplesFormArray!.length - 1);
    }
  }
}
