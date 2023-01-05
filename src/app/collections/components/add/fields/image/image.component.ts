import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FileTypeValidatorService } from 'src/app/collections/services/validators/file-type.service';

@Component({
  selector: 'app-add-collection-form-image-field',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class AddCollectionFormImageFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  constructor(private fileTypeValidator: FileTypeValidatorService) {}

  ngOnInit(): void {}

  get validFileTypes(): string {
    return this.fileTypeValidator.validTypes.toString();
  }

  get imageControl(): FormControl {
    return this.formGroup!.get('image')! as FormControl;
  }

  get isImageValid(): boolean {
    return this.imageControl.touched && this.imageControl.valid;
  }

  get isImageInvalid(): boolean {
    return this.imageControl.touched && this.imageControl.invalid;
  }
}
