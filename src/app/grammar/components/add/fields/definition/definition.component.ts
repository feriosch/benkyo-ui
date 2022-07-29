import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.scss'],
})
export class AddClauseFormDefinitionComponent implements OnInit {
  form?: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  get definitionControl() {
    return this.form!.get('definition');
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control as FormGroup;
  }
}
