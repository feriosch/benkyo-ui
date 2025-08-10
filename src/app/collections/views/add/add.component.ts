import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import {
  AddCollectionFrontendBody,
  AddCollectionResponse,
} from 'src/models/collections/add.model';
import { CollectionsService } from 'src/app/collections/services/collections.service';
import { CollectionNotificationService } from 'src/app/collections/services/notification.service';
import { FileTypeValidatorService } from 'src/app/collections/services/validators/file-type.service';

@Component({
  selector: 'app-add-collection-view',
  templateUrl: './add.component.html',
})
export class AddCollectionViewComponent implements OnInit {
  addCollectionForm: UntypedFormGroup;
  isSubmitting: boolean;

  constructor(
    private collectionsService: CollectionsService,
    private notificationService: CollectionNotificationService,
    fileTypeValidator: FileTypeValidatorService
  ) {
    this.addCollectionForm = new UntypedFormGroup({
      printingName: new UntypedFormControl(null, [Validators.required]),
      collectionName: new UntypedFormControl(null, [Validators.required]),
      group: new UntypedFormControl(null, [Validators.required]),
      imagePath: new UntypedFormControl(null, [
        Validators.required,
        fileTypeValidator.validate,
      ]),
      imageFile: new UntypedFormControl(null, [Validators.required]),
    });
    this.isSubmitting = false;
  }

  ngOnInit(): void {
    this.isSubmitting = false;
  }

  onSubmit(): void {
    this.isSubmitting = true;

    const formValue: AddCollectionFrontendBody = this.addCollectionForm.value;
    const formData: FormData = new FormData();

    formData.append('printing_name', formValue.printingName);
    formData.append('collection_name', formValue.collectionName);
    formData.append('group', formValue.group);
    formData.append('image', formValue.imageFile);

    this.collectionsService.insertCollection(formData).subscribe(
      (response: AddCollectionResponse) => {
        this.notificationService.toastCollectionCreationSuccess(
          formValue.printingName,
          response.id
        );
        this.addCollectionForm.reset();
      },
      (error) => {
        this.notificationService.toastCollectionCreationError(error.toString());
        console.log(error);
      },
      () => (this.isSubmitting = false)
    );
  }
}
