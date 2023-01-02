import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-word-form-word-field',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class EditWordFormWordFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  @Input()
  word?: string;

  constructor() {}

  get spanishControl() {
    return this.formGroup!.get('spanish');
  }

  ngOnInit(): void {}
}
