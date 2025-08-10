import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-word-form-word-field',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class EditWordFormWordFieldComponent implements OnInit {
  @Input()
  formGroup?: UntypedFormGroup;

  @Input()
  word?: string;

  constructor() {}

  get spanishControl(): UntypedFormControl {
    return this.formGroup!.get('spanish') as UntypedFormControl;
  }

  get isSpanishNDisabled(): boolean {
    return this.spanishControl.value === null;
  }

  addSpanishN() {
    this.spanishControl.patchValue(this.spanishControl.value + 'ñ');
  }

  ngOnInit(): void {}
}
