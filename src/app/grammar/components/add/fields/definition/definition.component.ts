import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.scss'],
})
export class AddClauseFormDefinitionComponent implements OnInit {
  @Input()
  formGroup?: UntypedFormGroup;

  constructor() {}

  get control(): UntypedFormControl {
    return this.formGroup!.get('definition') as UntypedFormControl;
  }

  ngOnInit(): void {}
}
