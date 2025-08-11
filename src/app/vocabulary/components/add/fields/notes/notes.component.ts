import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { VocabularyMainForm } from 'src/models/vocabulary/forms/form.model';

@Component({
  selector: 'app-add-word-form-notes-field',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class AddWordFormNotesFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup<VocabularyMainForm>;

  constructor() {}

  ngOnInit(): void {}

  get notesControl(): FormControl<string | null> {
    return this.formGroup!.get('notes') as FormControl<string | null>;
  }

  get isSpanishNDisabled(): boolean {
    return this.notesControl.value === null;
  }

  addSpanishN() {
    this.notesControl!.patchValue(this.notesControl!.value + 'ñ');
  }
}
