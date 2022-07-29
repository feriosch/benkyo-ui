import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-clause-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class AddClauseFormExampleComponent implements OnInit {
  @Input()
  control?: AbstractControl;
  
  formGroup?: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.formGroup = this.control! as FormGroup
  }

  get sentenceControl(): FormControl {
    return this.control!.get('sentence') as FormControl;
  }

  get translationControl(): FormControl {
    return this.control!.get('translation') as FormControl;
  }

  addFormatToSentence(format: number): void {
    let value = this.sentenceControl.value;
    switch (format) {
      case 1:
        value += '**';
        break;
      case 2:
        value += '__';
        break;
      case 3:
        value += '$$';
        break;
      default:
        break;
    }
    this.sentenceControl.setValue(value);
  }
}
