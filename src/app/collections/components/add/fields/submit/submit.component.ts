import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollectionForm } from 'src/models/collections/form.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-add-collection-form-submit-field',
  templateUrl: './submit.component.html',
  imports: [FormsModule, ReactiveFormsModule, NgClass],
})
export class AddCollectionFormSubmitFieldComponent implements OnInit {
  @Input()
  form!: FormGroup<CollectionForm>;

  @Input()
  isSubmitting!: boolean;

  constructor() {}

  get isSubmitDisabled(): boolean {
    return this.form.invalid || this.form.pending || this.isSubmitting;
  }

  ngOnInit(): void {}
}
