import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AddCollectionResponse } from 'src/models/collections/add.model';
import { CollectionsService } from 'src/app/collections/services/collections.service';
import { CollectionNotificationService } from 'src/app/collections/services/notification.service';
import { FileTypeValidatorService } from 'src/app/collections/services/validators/file-type.service';

// Define the form structure with proper control types
interface CollectionForm {
  printingName: FormControl<string | null>;
  collectionName: FormControl<string | null>;
  group: FormControl<string | null>;
  imagePath: FormControl<string | null>;
  imageFile: FormControl<File | null>;
}

@Component({
  selector: 'app-add-collection-view',
  templateUrl: './add.component.html',
})
export class AddCollectionViewComponent implements OnInit {
  addCollectionForm: FormGroup<CollectionForm>;
  isSubmitting: boolean;

  constructor(
    private collectionsService: CollectionsService,
    private notificationService: CollectionNotificationService,
    fileTypeValidator: FileTypeValidatorService
  ) {
    this.addCollectionForm = new FormGroup<CollectionForm>({
      printingName: new FormControl<string | null>(null, [Validators.required]),
      collectionName: new FormControl<string | null>(null, [Validators.required]),
      group: new FormControl<string | null>(null, [Validators.required]),
      imagePath: new FormControl<string | null>(null, [
        Validators.required,
        fileTypeValidator.validate,
      ]),
      imageFile: new FormControl<File | null>(null, [Validators.required]),
    });
    this.isSubmitting = false;
  }

  ngOnInit(): void {
    this.isSubmitting = false;
  }

  onSubmit(): void {
    this.isSubmitting = true;

    const formValue = this.addCollectionForm.value;

    // Add type safety checks for required fields
    if (!formValue.printingName || !formValue.collectionName || !formValue.group || !formValue.imageFile) {
      console.error('Required form fields are missing');
      this.isSubmitting = false;
      return;
    }

    const formData: FormData = new FormData();

    formData.append('printing_name', formValue.printingName);
    formData.append('collection_name', formValue.collectionName);
    formData.append('group', formValue.group);
    formData.append('image', formValue.imageFile);

    this.collectionsService.insertCollection(formData).subscribe(
      (response: AddCollectionResponse) => {
        this.notificationService.toastCollectionCreationSuccess(
          formValue.printingName!,
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
