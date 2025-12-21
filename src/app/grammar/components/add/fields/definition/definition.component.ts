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
  selector: 'app-add-clause-form-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf],
})
export class AddClauseFormDefinitionComponent implements OnInit {
  @Input()
  formGroup?: FormGroup<MainForm>;

  constructor() {}

  get control(): FormControl<string | null> {
    return this.formGroup!.get('definition') as FormControl<string | null>;
  }

  ngOnInit(): void {}
}
