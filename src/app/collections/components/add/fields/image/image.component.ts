import { Component, Input, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';

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

  get imagePathControl(): FormControl {
    return this.formGroup!.get('imagePath')! as FormControl;
  }

  get imageFileControl(): FormControl {
    return this.formGroup!.get('imageFile')! as FormControl;
  }

  get isImagePathValid(): boolean {
    return this.imagePathControl.touched && this.imagePathControl.valid;
  }

  get isImagePathInvalid(): boolean {
    return this.imagePathControl.touched && this.imagePathControl.invalid;
  }

  uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.imagePathControl.patchValue(file.name);
    this.imageFileControl.patchValue(file);
    this.imageFileControl.updateValueAndValidity();
  }
}
