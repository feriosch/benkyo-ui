import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { AddWordBody } from 'src/models/requests/add-word-body.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { VocabularyService } from 'src/app/vocabulary/services/vocabulary.service';
import { ExistsValidatorService } from 'src/app/vocabulary/services/forms/exists-validator.service';
import { ValueTransformerService } from 'src/app/vocabulary/services/forms/value-transformer.service';

@Component({
  selector: 'app-add-word-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddWordFormComponent implements OnInit {
  addWordForm: FormGroup;
  initialValues: any;

  constructor(
    private vocabularyService: VocabularyService,
    private existsValidator: ExistsValidatorService,
    private valueTransformerService: ValueTransformerService,
    private notificationService: NotificationService
  ) {
    this.addWordForm = new FormGroup({
      word: new FormControl(
        null,
        [Validators.required],
        [this.existsValidator.validate.bind(this.existsValidator)]
      ),
      hiragana: new FormControl(null),
      spanish: new FormControl(null, [Validators.required]),
      type: new FormGroup({
        noun: new FormControl(0, [Validators.required]),
        suruVerb: new FormControl(0, [Validators.required]),
        noAdjective: new FormControl(0, [Validators.required]),
        naAdjective: new FormControl(0, [Validators.required]),
        iAdjective: new FormControl(0, [Validators.required]),
        adverb: new FormControl(0, [Validators.required]),
        verb: new FormControl(0, [Validators.required]),
        adjectivalNoun: new FormControl(0, [Validators.required]),
        adverbialNoun: new FormControl(0, [Validators.required]),
        counter: new FormControl(0, [Validators.required]),
      }),
      tags: new FormGroup({
        ateji: new FormControl(false, [Validators.required]),
        common: new FormControl(false, [Validators.required]),
        expression: new FormControl(false, [Validators.required]),
        honorific: new FormControl(false, [Validators.required]),
        humble: new FormControl(false, [Validators.required]),
        intransitive: new FormControl(false, [Validators.required]),
        jlptN1: new FormControl(false, [Validators.required]),
        notJoyo: new FormControl(false, [Validators.required]),
        onomatopoeic: new FormControl(false, [Validators.required]),
        transitive: new FormControl(false, [Validators.required]),
        usuallyKana: new FormControl(false, [Validators.required]),
      }),
      notes: new FormControl(null, [Validators.max(20)]),
      collection: new FormControl(null, [Validators.required]),
      sentences: new FormArray([]),
    });
    this.initialValues = this.addWordForm.value;
  }

  ngOnInit(): void {}

  getFormGroup(formGroup: string): FormGroup {
    return this.addWordForm.get(formGroup) as FormGroup;
  }

  getFormArray(formArray: string): FormArray {
    return this.addWordForm.get(formArray) as FormArray;
  }

  get collectionControl() {
    return this.addWordForm.get('collection') as FormControl;
  }

  onSubmit(): void {
    const addWordBody: AddWordBody = this.valueTransformerService.transform(
      this.addWordForm.value
    );
    this.vocabularyService.addNewWord(addWordBody).subscribe(
      (_response) => {
        const collection = this.collectionControl!.value;
        this.notificationService.toastWordCreationNotification(collection);
        this.addWordForm.reset(this.initialValues);
        this.collectionControl!.setValue(collection);
      },
      (error) => {
        this.notificationService.toastErrorNotification(error.error.error);
      }
    );
  }
}
