import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-word-form-notes-field',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class AddWordFormNotesFieldComponent implements OnInit {
  @Input()
  formGroup?: UntypedFormGroup;

  constructor() {}

  ngOnInit(): void {}

  get notesControl(): UntypedFormControl {
    return this.formGroup!.get('notes') as UntypedFormControl;
  }

  get isSpanishNDisabled(): boolean {
    return this.notesControl.value === null;
  }

  addSpanishN() {
    this.notesControl!.patchValue(this.notesControl!.value + 'ñ');
  }
}
