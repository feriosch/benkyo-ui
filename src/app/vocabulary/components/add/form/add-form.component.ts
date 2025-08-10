import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

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
  addWordForm: UntypedFormGroup;
  initialValues: any;

  constructor(
    private vocabularyService: VocabularyService,
    private existsValidator: ExistsValidatorService,
    private valueTransformerService: ValueTransformerService,
    private notificationService: NotificationService
  ) {
    this.addWordForm = new UntypedFormGroup({
      word: new UntypedFormControl(
        null,
        [Validators.required],
        [this.existsValidator.validate.bind(this.existsValidator)]
      ),
      hiragana: new UntypedFormControl(null),
      spanish: new UntypedFormControl(null, [Validators.required]),
      type: new UntypedFormGroup({
        noun: new UntypedFormControl(0, [Validators.required]),
        suru: new UntypedFormControl(0, [Validators.required]),
        noAdj: new UntypedFormControl(0, [Validators.required]),
        naAdj: new UntypedFormControl(0, [Validators.required]),
        iAdj: new UntypedFormControl(0, [Validators.required]),
        adv: new UntypedFormControl(0, [Validators.required]),
        verb: new UntypedFormControl(0, [Validators.required]),
        adjNoun: new UntypedFormControl(0, [Validators.required]),
        advNoun: new UntypedFormControl(0, [Validators.required]),
        counter: new UntypedFormControl(0, [Validators.required]),
      }),
      tags: new UntypedFormGroup({
        ateji: new UntypedFormControl(false, [Validators.required]),
        common: new UntypedFormControl(false, [Validators.required]),
        expression: new UntypedFormControl(false, [Validators.required]),
        honorific: new UntypedFormControl(false, [Validators.required]),
        humble: new UntypedFormControl(false, [Validators.required]),
        intransitive: new UntypedFormControl(false, [Validators.required]),
        jlptN1: new UntypedFormControl(false, [Validators.required]),
        notJoyo: new UntypedFormControl(false, [Validators.required]),
        onomatopoeic: new UntypedFormControl(false, [Validators.required]),
        transitive: new UntypedFormControl(false, [Validators.required]),
        usuallyKana: new UntypedFormControl(false, [Validators.required]),
      }),
      notes: new UntypedFormControl(null, [Validators.max(20)]),
      collection: new UntypedFormControl(null, [Validators.required]),
      sentences: new UntypedFormArray([]),
    });
    this.initialValues = this.addWordForm.value;
  }

  ngOnInit(): void {}

  getFormGroup(formGroup: string): UntypedFormGroup {
    return this.addWordForm.get(formGroup) as UntypedFormGroup;
  }

  getFormArray(formArray: string): UntypedFormArray {
    return this.addWordForm.get(formArray) as UntypedFormArray;
  }

  get collectionControl() {
    return this.addWordForm.get('collection') as UntypedFormControl;
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
