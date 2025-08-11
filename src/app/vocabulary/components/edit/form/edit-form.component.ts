import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AddWordBody } from 'src/models/requests/add-word-body.model';
import { Sentence, Word } from 'src/models/responses/vocabulary/word.model';
import { Collection } from 'src/models/collections/collection.model';
import { FromBackendTypeMap } from 'src/models/vocabulary/type';
import { FromBackendTagsMap } from 'src/models/vocabulary/tags';
import { NotificationService } from 'src/app/shared/notification.service';
import { VocabularyService } from 'src/app/vocabulary/services/vocabulary.service';
import { TypeMapperService } from 'src/app/vocabulary/services/type-mapper.service';
import { TagsMapperService } from 'src/app/vocabulary/services/tags-mapper.service';
import { ValueTransformerService } from 'src/app/vocabulary/services/forms/value-transformer.service';
import { VocabularyFormService } from 'src/app/vocabulary/services/forms/form.service';
import {
  VocabularyMainForm,
  VocabularyTypeForm,
  VocabularyTagsForm,
  VocabularySentenceForm,
  VocabularyFormValues,
} from 'src/models/vocabulary/forms/form.model';

@Component({
  selector: 'app-edit-word-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditWordFormComponent implements OnInit {
  @Input()
  fullWord?: Word;

  @Input()
  id?: string;

  editWordForm: FormGroup<VocabularyMainForm>;
  collections?: Collection[];
  originalTags: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vocabularyService: VocabularyService,
    private typeMapperService: TypeMapperService,
    private tagsMapperService: TagsMapperService,
    private valueTransformerService: ValueTransformerService,
    private notificationService: NotificationService,
    private vocabularyFormService: VocabularyFormService,
  ) {
    this.editWordForm = this.vocabularyFormService.createNewForm();
    this.originalTags = [];
  }

  ngOnInit(): void {
    this.initializeBasicControls();
    this.initializeTypeControls();
    if (this.fullWord!.tags) this.initializeTagControls();
    if (this.fullWord!.sentences) this.initializeSentenceControls();
  }

  getFormControl(control: string): FormControl {
    return this.editWordForm.get(control) as FormControl;
  }

  getFormGroup(group: string): FormGroup {
    return this.editWordForm.get(group) as FormGroup;
  }

  getFormArray(formArray: string): FormArray {
    return this.editWordForm.get(formArray) as FormArray;
  }

  initializeBasicControls(): void {
    const spanishControl: FormControl<string | null> = this.getFormControl(
      'spanish',
    ) as FormControl<string | null>;
    spanishControl.setValue(this.fullWord!.spanish);

    if (this.fullWord!.hiragana) {
      const hiraganaControl: FormControl<string | null> = this.getFormControl(
        'hiragana',
      ) as FormControl<string | null>;
      hiraganaControl.setValue(this.fullWord!.hiragana);
    }

    if (this.fullWord!.notes) {
      const notesControl: FormControl<string | null> = this.getFormControl(
        'notes',
      ) as FormControl<string | null>;
      notesControl.setValue(this.fullWord!.notes);
    }
  }

  initializeTypeControls(): void {
    for (const [subtype, value] of Object.entries(this.fullWord!.type)) {
      const frontendSubtype: string =
        this.typeMapperService.frontendSubtypes[
          subtype as keyof FromBackendTypeMap
        ];
      const typeGroup: FormGroup<VocabularyTypeForm> = this.getFormGroup(
        'type',
      ) as FormGroup<VocabularyTypeForm>;
      const subtypeControl: FormControl<number> = typeGroup.get(
        frontendSubtype,
      ) as FormControl<number>;

      if (subtypeControl) subtypeControl.setValue(parseInt(value));
    }
  }

  initializeTagControls(): void {
    this.fullWord!.tags!.forEach((backendTag: string) => {
      const frontendTag: string =
        this.tagsMapperService.frontendTags[
          backendTag as keyof FromBackendTagsMap
        ];

      const tagsGroup: FormGroup<VocabularyTagsForm> = this.getFormGroup(
        'tags',
      ) as FormGroup<VocabularyTagsForm>;
      const tagControl: FormControl<boolean> = tagsGroup.get(
        frontendTag,
      ) as FormControl<boolean>;

      if (tagControl) tagControl.setValue(true);
    });
  }

  initializeSentenceControls(): void {
    const sentencesArray: FormArray<FormGroup<VocabularySentenceForm>> =
      this.editWordForm.get('sentences')! as FormArray<
        FormGroup<VocabularySentenceForm>
      >;
    this.fullWord!.sentences!.forEach((sentence: Sentence) => {
      sentencesArray.push(
        new FormGroup<VocabularySentenceForm>({
          japanese: new FormControl<string | null>(sentence.sentence, [
            Validators.required,
          ]),
          translation: new FormControl<string | null>(sentence.translation, [
            Validators.required,
          ]),
        }),
      );
    });
  }

  onSubmit(): void {
    const editWordBody: AddWordBody = this.valueTransformerService.transform(
      this.editWordForm.value as VocabularyFormValues,
      this.id,
    );
    this.vocabularyService.updateWord(editWordBody).subscribe(
      async (_response) => {
        await this.router.navigate(['../'], { relativeTo: this.route });
        this.notificationService.toastWordUpdateNotification(
          this.fullWord!.word,
        );
      },
      (error) => {
        this.notificationService.toastErrorNotification(error.error.error);
      },
    );
  }
}
