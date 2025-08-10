import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'],
})
export class AddClauseFormFormationsComponent implements OnInit {
  @Input()
  formGroup?: UntypedFormGroup;

  @Input()
  formArray?: UntypedFormArray;

  constructor() {}

  ngOnInit(): void {}

  getFormGroupFromControl(control: AbstractControl): UntypedFormGroup {
    return control as UntypedFormGroup;
  }

  getExamplesFormArray(control: AbstractControl): UntypedFormArray {
    return control!.get('examples') as UntypedFormArray;
  }

  pushFormation(): void {
    this.formArray!.push(
      new UntypedFormGroup({
        rule: new UntypedFormControl(null, [Validators.required]),
        examples: new UntypedFormArray([]),
      })
    );
  }

  popFormation(): void {
    if (this.formArray!.length > 0)
      this.formArray!.removeAt(this.formArray!.length - 1);
  }

  pushExample(control: AbstractControl): void {
    this.getExamplesFormArray(control)!.push(
      new UntypedFormGroup({
        sentence: new UntypedFormControl('', [Validators.required]),
        translation: new UntypedFormControl('', [Validators.required]),
      })
    );
  }

  popExample(control: AbstractControl): void {
    const examplesFormArray: UntypedFormArray = this.getExamplesFormArray(control)!;
    if (examplesFormArray!.length > 0) {
      examplesFormArray!.removeAt(examplesFormArray!.length - 1);
    }
  }
}
