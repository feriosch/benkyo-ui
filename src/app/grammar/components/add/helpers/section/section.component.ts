import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class AddClauseFormSectionComponent implements OnInit {
  @Input()
  control?: AbstractControl;

  formGroup?: UntypedFormGroup;
  explanationControl?: UntypedFormControl;
  examplesArray?: UntypedFormArray;

  constructor() {}

  ngOnInit(): void {
    this.formGroup = this.control! as UntypedFormGroup;
    this.explanationControl = this.control!.get('explanation') as UntypedFormControl;
    this.examplesArray = this.control!.get('examples') as UntypedFormArray;
  }

  pushExample(): void {
    this.examplesArray!.push(
      new UntypedFormGroup({
        sentence: new UntypedFormControl('', [Validators.required]),
        translation: new UntypedFormControl('', [Validators.required]),
      })
    );
  }

  popExample(): void {
    if (this.examplesArray!.length > 0) {
      this.examplesArray!.removeAt(this.examplesArray!.length - 1);
    }
  }
}
