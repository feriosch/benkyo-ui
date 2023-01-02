import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-word-form-sentences-field',
  templateUrl: './sentences.component.html',
  styleUrls: ['./sentences.component.scss'],
})
export class AddWordFormSentencesFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  @Input()
  formArray?: FormArray;

  constructor() {}

  get controls() {
    return this.formArray!.controls;
  }

  ngOnInit(): void {}

  pushSentence(): void {
    this.formArray!.push(
      new FormGroup({
        japanese: new FormControl('', [Validators.required]),
        translation: new FormControl('', [Validators.required]),
      })
    );
  }

  popSentence(): void {
    if (this.formArray!.length > 0) {
      this.formArray!.removeAt(this.formArray!.length - 1);
    }
  }

  isControlInvalid(name: string, index: number): boolean {
    const control: FormControl = this.controls[index].get(name)! as FormControl;
    return control.touched && control.invalid;
  }
}
