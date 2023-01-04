import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileTypeValidatorService } from 'src/app/collections/services/validators/file-type.service';

@Component({
  selector: 'app-add-collection-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class AddCollectionFormComponent implements OnInit {
  addCollectionForm: FormGroup;

  constructor(fileTypeValidator: FileTypeValidatorService) {
    this.addCollectionForm = new FormGroup({
      printingName: new FormControl(null, [Validators.required]),
      collectionName: new FormControl(null, [Validators.required]),
      group: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [
        Validators.required,
        fileTypeValidator.validate,
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.addCollectionForm.value)
  }
}
