import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-collection-form-submit-field',
  templateUrl: './submit.component.html',
})
export class AddCollectionFormSubmitFieldComponent implements OnInit {
  @Input()
  form!: UntypedFormGroup;

  @Input()
  isSubmitting!: boolean;

  constructor() {}

  get isSubmitDisabled(): boolean {
    return this.form.invalid || this.form.pending || this.isSubmitting;
  }

  ngOnInit(): void {}
}
