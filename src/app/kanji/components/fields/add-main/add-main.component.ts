import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-add-kanji-form-main-field',
  templateUrl: './add-main.component.html',
})
export class AddKanjiFormMainFieldComponent implements OnInit {
  @Input()
  form!: FormGroup;

  constructor(private formService: FormService) {}

  // TODO: Spanish Repetition validation
  get isSpanishInvalid(): boolean {
    const spanishControl: FormControl =
      this.formService.getControl<FormControl>(this.form, 'spanish');
    return spanishControl.touched && spanishControl.invalid;
  }

  ngOnInit(): void {}
}
