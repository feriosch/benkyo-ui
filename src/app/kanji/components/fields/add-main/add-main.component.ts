import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { KanjiMainForm } from 'src/models/kanji/forms/form.model';
import { FormService } from 'src/app/shared/services/form.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-kanji-form-main-field',
  templateUrl: './add-main.component.html',
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf],
})
export class AddKanjiFormMainFieldComponent implements OnInit {
  @Input()
  form!: FormGroup<KanjiMainForm>;

  constructor(private formService: FormService) {}

  // TODO: Spanish Repetition validation
  get isSpanishInvalid(): boolean {
    const spanishControl: FormControl =
      this.formService.getControl<FormControl>(this.form, 'spanish');
    return spanishControl.touched && spanishControl.invalid;
  }

  ngOnInit(): void {}
}
