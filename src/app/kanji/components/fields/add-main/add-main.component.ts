import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-kanji-form-main-field',
  templateUrl: './add-main.component.html',
  styleUrls: ['./add-main.component.scss'],
})
export class AddKanjiFormMainFieldComponent implements OnInit {
  @Input()
  formGroup!: FormGroup;

  constructor() {}

  // TODO: Spanish Repetition validation
  get isSpanishInvalid(): boolean {
    const spanishControl: FormControl = this.formGroup.get(
      'spanish'
    )! as FormControl;
    return spanishControl.touched && spanishControl.invalid;
  }

  ngOnInit(): void {}
}
