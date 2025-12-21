import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MainForm } from 'src/models/grammar/forms/form';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-clause-form-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf],
})
export class AddClauseFormTitleComponent implements OnInit {
  @Input()
  formGroup?: FormGroup<MainForm>;

  constructor() {}

  get titleControl() {
    return this.formGroup!.get('title') as FormControl<string | null>;
  }

  get translationControl() {
    return this.formGroup!.get('translation') as FormControl<string | null>;
  }

  ngOnInit(): void {}
}
