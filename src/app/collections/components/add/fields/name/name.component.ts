import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FormService } from 'src/app/shared/services/form.service';
import { CollectionForm } from 'src/models/collections/form.model';

@Component({
  selector: 'app-add-collection-form-name-field',
  templateUrl: './name.component.html',
})
export class AddCollectionFormNameFieldComponent implements OnInit {
  @Input()
  form!: FormGroup<CollectionForm>;

  constructor(private formService: FormService) {}

  get isPrintingNameInvalid(): boolean {
    const control = this.formService.getControl<FormControl<string | null>>(
      this.form,
      'printingName',
    );
    return control.touched && control.invalid;
  }

  get isCollectionNameInvalid(): boolean {
    const control = this.formService.getControl<FormControl<string | null>>(
      this.form,
      'collectionName',
    );
    return control.touched && control.invalid;
  }

  get isGroupInvalid(): boolean {
    const control = this.formService.getControl<FormControl<string | null>>(
      this.form,
      'group',
    );
    return control.touched && control.invalid;
  }

  ngOnInit(): void {}
}
