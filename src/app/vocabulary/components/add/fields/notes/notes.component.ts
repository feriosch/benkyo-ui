import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-word-form-notes-field',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class AddWordFormNotesFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  get notesControl(): FormControl {
    return this.formGroup!.get('notes') as FormControl;
  }

  get isSpanishNDisabled(): boolean {
    return this.notesControl.value === null;
  }

  addSpanishN() {
    this.notesControl!.patchValue(this.notesControl!.value + 'ñ');
  }
}
