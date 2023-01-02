import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-word-form-word-field',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class AddWordFormWordFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  constructor() {}

  get wordControl() {
    return this.formGroup!.get('word');
  }

  get spanishControl() {
    return this.formGroup!.get('spanish');
  }

  isWordRepeated(): boolean {
    if (this.wordControl!.errors) {
      return this.wordControl!.errors!.hasOwnProperty('repeatedWord');
    }
    return false;
  }

  ngOnInit(): void {}
}
