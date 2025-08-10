import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

// Define the form structure for the submit field
interface CollectionSubmitForm {
  printingName: FormControl<string | null>;
  collectionName: FormControl<string | null>;
  group: FormControl<string | null>;
  imagePath: FormControl<string | null>;
  imageFile: FormControl<File | null>;
}

@Component({
  selector: 'app-add-collection-form-submit-field',
  templateUrl: './submit.component.html',
})
export class AddCollectionFormSubmitFieldComponent implements OnInit {
  @Input()
  form!: FormGroup<CollectionSubmitForm>;

  @Input()
  isSubmitting!: boolean;

  constructor() {}

  get isSubmitDisabled(): boolean {
    return this.form.invalid || this.form.pending || this.isSubmitting;
  }

  ngOnInit(): void {}
}
