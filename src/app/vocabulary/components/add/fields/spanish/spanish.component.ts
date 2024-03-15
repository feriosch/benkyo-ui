import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-word-form-spanish-field',
  templateUrl: './spanish.component.html',
  styleUrls: ['./spanish.component.scss'],
})
export class AddWordFormSpanishFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  get spanishControl(): FormControl {
    return this.formGroup!.get('spanish') as FormControl;
  }

  get isSpanishNDisabled(): boolean {
    return this.spanishControl.value === null;
  }

  addSpanishN() {
    this.spanishControl.patchValue(this.spanishControl.value + 'ñ');
  }
}
