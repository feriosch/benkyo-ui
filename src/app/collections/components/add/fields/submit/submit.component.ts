import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-collection-form-submit-field',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
})
export class AddCollectionFormSubmitFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
