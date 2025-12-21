import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { AddWordBody } from 'src/models/requests/add-word-body.model';
import {
  VocabularyMainForm,
  VocabularyFormValues,
} from 'src/models/vocabulary/forms/form.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { VocabularyService } from 'src/app/vocabulary/services/vocabulary.service';
import { VocabularyFormService } from 'src/app/vocabulary/services/forms/form.service';
import { ValueTransformerService } from 'src/app/vocabulary/services/forms/value-transformer.service';
import { AddWordFormWordFieldComponent } from '../fields/word/word.component';
import { AddWordFormSpanishFieldComponent } from '../fields/spanish/spanish.component';
import { AddWordFormTypeFieldComponent } from '../fields/type/type.component';
import { AddWordFormTagsFieldComponent } from '../fields/tags/tags.component';
import { AddWordFormNotesFieldComponent } from '../fields/notes/notes.component';
import { AddWordFormCollectionFieldComponent } from '../fields/collection/collection.component';
import { AddWordFormSentencesFieldComponent } from '../fields/sentences/sentences.component';
import { AddWordFormSubmitFieldComponent } from '../fields/submit/submit.component';

@Component({
  selector: 'app-add-word-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AddWordFormWordFieldComponent,
    AddWordFormSpanishFieldComponent,
    AddWordFormTypeFieldComponent,
    AddWordFormTagsFieldComponent,
    AddWordFormNotesFieldComponent,
    AddWordFormCollectionFieldComponent,
    AddWordFormSentencesFieldComponent,
    AddWordFormSubmitFieldComponent,
  ],
})
export class AddWordFormComponent implements OnInit {
  addWordForm: FormGroup<VocabularyMainForm>;

  constructor(
    private vocabularyService: VocabularyService,
    private valueTransformerService: ValueTransformerService,
    private notificationService: NotificationService,
    private vocabularyFormService: VocabularyFormService,
  ) {
    this.addWordForm = this.vocabularyFormService.createNewForm();
  }

  ngOnInit(): void {
    this.vocabularyFormService.initializeForm(this.addWordForm);
  }

  getFormGroup(formGroup: string): FormGroup {
    return this.addWordForm.get(formGroup) as FormGroup;
  }

  getFormArray(formArray: string): FormArray {
    return this.addWordForm.get(formArray) as FormArray;
  }

  get collectionControl(): FormControl<string> {
    return this.addWordForm.get('collection') as FormControl<string>;
  }

  onSubmit(): void {
    const addWordBody: AddWordBody = this.valueTransformerService.transform(
      this.addWordForm.value as VocabularyFormValues,
    );
    this.vocabularyService.addNewWord(addWordBody).subscribe(
      (_response) => {
        const collection = this.collectionControl!.value;
        this.notificationService.toastWordCreationNotification(collection);
        this.vocabularyFormService.resetFormValues();
        this.collectionControl!.setValue(collection);
      },
      (error) => {
        this.notificationService.toastErrorNotification(error.error.error);
      },
    );
  }
}
