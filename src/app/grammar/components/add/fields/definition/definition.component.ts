import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.scss'],
})
export class AddClauseFormDefinitionComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  constructor() {}

  get control(): FormControl {
    return this.formGroup!.get('definition') as FormControl;
  }

  ngOnInit(): void {}
}
