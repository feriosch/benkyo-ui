import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class AddClauseFormNotesComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  @Input()
  formArray?: FormArray;

  constructor() {}

  ngOnInit(): void {}

  pushSection(): void {
    this.formArray!.push(
      new FormGroup({
        explanation: new FormControl(null, [Validators.required]),
        examples: new FormArray([]),
      })
    );
  }

  popSection(): void {
    if (this.formArray!.length > 0) {
      this.formArray!.removeAt(this.formArray!.length - 1);
    }
  }
}
