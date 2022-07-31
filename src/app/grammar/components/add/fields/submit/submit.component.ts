import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

import { AddClauseBody } from 'src/models/requests/grammar/add-clause.model';
import { AddClauseValuesTransformerService } from 'src/app/grammar/services/add-values-transformer.service';

@Component({
  selector: 'app-add-clause-form-submit-button',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
})
export class AddClauseFormSubmitButtonComponent implements OnInit {
  formGroup?: FormGroup;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private valueTransformerService: AddClauseValuesTransformerService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.rootFormGroup.control as FormGroup;
  }

  onSubmit(): void {
    const addClauseBody: AddClauseBody = this.valueTransformerService.transform(
      this.formGroup!.value
    );
    console.log(addClauseBody);
  }
}
