import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-word-form-submit-field',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
})
export class AddWordFormSubmitFieldComponent implements OnInit {
  @Input()
  formGroup?: UntypedFormGroup;

  constructor() {}

  ngOnInit(): void {}
}
