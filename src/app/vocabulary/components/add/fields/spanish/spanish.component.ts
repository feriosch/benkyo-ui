import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-word-form-spanish-field',
  templateUrl: './spanish.component.html',
  styleUrls: ['./spanish.component.scss'],
})
export class AddWordFormSpanishFieldComponent implements OnInit {
  @Input()
  formGroup?: UntypedFormGroup;

  constructor() {}

  ngOnInit(): void {}

  get spanishControl(): UntypedFormControl {
    return this.formGroup!.get('spanish') as UntypedFormControl;
  }

  get isSpanishNDisabled(): boolean {
    return this.spanishControl.value === null;
  }

  addSpanishN() {
    this.spanishControl.patchValue(this.spanishControl.value + 'ñ');
  }
}
