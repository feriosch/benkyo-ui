import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-add-collection-form-name-field',
  templateUrl: './name.component.html',
})
export class AddCollectionFormNameFieldComponent implements OnInit {
  @Input()
  form!: FormGroup;

  constructor(private formService: FormService) {}

  get isPrintingNameInvalid(): boolean {
    const control = this.formService.getControl<FormControl>(
      this.form,
      'printingName'
    );
    return control.touched && control.invalid;
  }

  get isCollectionNameInvalid(): boolean {
    const control = this.formService.getControl<FormControl>(
      this.form,
      'collectionName'
    );
    return control.touched && control.invalid;
  }

  get isGroupInvalid(): boolean {
    const control = this.formService.getControl<FormControl>(
      this.form,
      'group'
    );
    return control.touched && control.invalid;
  }

  ngOnInit(): void {}

  isControlInvalid(name: string): boolean {
    const control = this.formService.getControl<FormControl>(this.form, name);
    return control.touched && control.invalid;
  }
}
