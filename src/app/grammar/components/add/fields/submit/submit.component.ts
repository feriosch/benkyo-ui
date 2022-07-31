import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-submit-button',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
})
export class AddClauseFormSubmitButtonComponent implements OnInit {
  formGroup?: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.formGroup = this.rootFormGroup.control as FormGroup;
  }
}
