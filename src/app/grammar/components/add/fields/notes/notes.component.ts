import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class AddClauseFormNotesComponent implements OnInit {
  @Input()
  formGroup?: UntypedFormGroup;

  @Input()
  formArray?: UntypedFormArray;

  constructor() {}

  ngOnInit(): void {}

  pushSection(): void {
    this.formArray!.push(
      new UntypedFormGroup({
        explanation: new UntypedFormControl(null, [Validators.required]),
        examples: new UntypedFormArray([]),
      })
    );
  }

  popSection(): void {
    if (this.formArray!.length > 0) {
      this.formArray!.removeAt(this.formArray!.length - 1);
    }
  }
}
