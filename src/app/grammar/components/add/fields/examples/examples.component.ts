import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-examples-field',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
})
export class AddClauseFormExamplesFieldComponent implements OnInit {
  @Input()
  formGroup?: UntypedFormGroup;

  @Input()
  formArray?: UntypedFormArray;

  constructor() {}

  ngOnInit(): void {}

  pushExample(): void {
    this.formArray!.push(
      new UntypedFormGroup({
        sentence: new UntypedFormControl(null, [Validators.required]),
        translation: new UntypedFormControl(null, [Validators.required]),
      })
    );
  }

  popExample(): void {
    if (this.formArray!.length > 0) {
      this.formArray!.removeAt(this.formArray!.length - 1);
    }
  }
}
