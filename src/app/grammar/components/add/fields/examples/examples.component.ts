import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-examples-field',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
})
export class AddClauseFormExamplesFieldComponent implements OnInit {
  form?: FormGroup;
  examplesFormArray?: FormArray;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control as FormGroup;
    this.examplesFormArray = this.rootFormGroup.control.get(
      'examples'
    ) as FormArray;
  }

  pushExample(): void {
    this.examplesFormArray!.push(
      new FormGroup({
        sentence: new FormControl('', [Validators.required]),
        translation: new FormControl('', [Validators.required]),
      })
    );
  }

  popExample(): void {
    if (this.examplesFormArray!.length > 0) {
      this.examplesFormArray!.removeAt(this.examplesFormArray!.length - 1);
    }
  }
}
