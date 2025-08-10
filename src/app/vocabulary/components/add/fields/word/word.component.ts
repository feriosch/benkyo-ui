import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-word-form-word-field',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class AddWordFormWordFieldComponent implements OnInit {
  @Input()
  formGroup?: UntypedFormGroup;

  constructor() {}

  get wordControl() {
    return this.formGroup!.get('word');
  }

  isWordRepeated(): boolean {
    if (this.wordControl!.errors) {
      return this.wordControl!.errors!.hasOwnProperty('repeatedWord');
    }
    return false;
  }

  ngOnInit(): void {}
}
