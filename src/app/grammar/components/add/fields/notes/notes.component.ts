import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MainForm, NoteForm, ExampleForm } from 'src/models/grammar/forms/form';

import { AddClauseFormSectionComponent } from '../../helpers/section/section.component';

@Component({
  selector: 'app-add-clause-form-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, AddClauseFormSectionComponent],
})
export class AddClauseFormNotesComponent implements OnInit {
  @Input()
  formGroup?: FormGroup<MainForm>;

  @Input()
  formArray?: FormArray<FormGroup<NoteForm>>;

  constructor() {}

  ngOnInit(): void {}

  pushSection(): void {
    this.formArray!.push(
      new FormGroup<NoteForm>({
        explanation: new FormControl<string | null>(null, [
          Validators.required,
        ]),
        examples: new FormArray<FormGroup<ExampleForm>>([]),
      }),
    );
  }

  popSection(): void {
    if (this.formArray!.length > 0) {
      this.formArray!.removeAt(this.formArray!.length - 1);
    }
  }
}
