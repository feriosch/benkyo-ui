import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-submit-button',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
})
export class AddClauseFormSubmitButtonComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
