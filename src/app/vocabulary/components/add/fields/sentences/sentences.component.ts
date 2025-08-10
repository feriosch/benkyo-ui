import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-word-form-sentences-field',
  templateUrl: './sentences.component.html',
  styleUrls: ['./sentences.component.scss'],
})
export class AddWordFormSentencesFieldComponent implements OnInit {
  @Input()
  formGroup?: UntypedFormGroup;

  @Input()
  formArray?: UntypedFormArray;

  constructor() {}

  get controls() {
    return this.formArray!.controls;
  }

  ngOnInit(): void {}

  pushSentence(): void {
    this.formArray!.push(
      new UntypedFormGroup({
        japanese: new UntypedFormControl('', [Validators.required]),
        translation: new UntypedFormControl('', [Validators.required]),
      })
    );
  }

  popSentence(): void {
    if (this.formArray!.length > 0) {
      this.formArray!.removeAt(this.formArray!.length - 1);
    }
  }

  isControlInvalid(name: string, index: number): boolean {
    const control: UntypedFormControl = this.controls[index].get(name)! as UntypedFormControl;
    return control.touched && control.invalid;
  }
}
