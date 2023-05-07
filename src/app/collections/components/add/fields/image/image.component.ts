import { Component, Input, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';

import { FileTypeValidatorService } from 'src/app/collections/services/validators/file-type.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-add-collection-form-image-field',
  templateUrl: './image.component.html',
})
export class AddCollectionFormImageFieldComponent implements OnInit {
  @Input()
  form!: FormGroup;

  constructor(
    private fileTypeValidator: FileTypeValidatorService,
    private formService: FormService
  ) {}

  get fileTypes(): string {
    return this.fileTypeValidator.validTypes.toString();
  }

  get pathControl(): FormControl {
    return this.formService.getControl<FormControl>(this.form, 'imagePath');
  }

  get fileControl(): FormControl {
    return this.formService.getControl<FormControl>(this.form, 'imageFile');
  }

  get isPathValid(): boolean {
    return this.pathControl.touched && this.pathControl.valid;
  }

  get isPathInvalid(): boolean {
    return this.pathControl.touched && this.pathControl.invalid;
  }

  ngOnInit(): void {}

  uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.pathControl.patchValue(file.name);
    this.fileControl.patchValue(file);
    this.fileControl.updateValueAndValidity();
  }
}
