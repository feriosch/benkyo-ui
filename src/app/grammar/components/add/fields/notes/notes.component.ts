import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class AddClauseFormNotesComponent implements OnInit {
  form?: FormGroup;
  formArray?: FormArray;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control as FormGroup;
    this.formArray = this.form.get('notes') as FormArray;
  }

  pushSection(): void {
    this.formArray!.push(
      new FormGroup({
        explanation: new FormControl('', [Validators.required]),
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
