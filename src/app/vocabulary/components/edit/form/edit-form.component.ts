import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AddWordBody } from 'src/models/requests/add-word-body.model';
import { Sentence, Word } from 'src/models/responses/vocabulary/word.model';
import { Collection } from 'src/models/collections/collection.model';
import { FromBackendTypeMap } from 'src/models/vocabulary/type';
import { FromBackendTagsMap } from 'src/models/vocabulary/tags';
import { NotificationService } from 'src/app/shared/notification.service';
import { CollectionsService } from 'src/app/collections/services/collections.service';
import { VocabularyService } from 'src/app/vocabulary/services/vocabulary.service';
import { TypeMapperService } from 'src/app/vocabulary/services/type-mapper.service';
import { TagsMapperService } from 'src/app/vocabulary/services/tags-mapper.service';
import { ValueTransformerService } from 'src/app/vocabulary/services/forms/value-transformer.service';
import { CollectionsResponse } from 'src/models/collections/responses.model';

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

  editWordForm: UntypedFormGroup;
  collections?: Collection[];
  originalTags: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vocabularyService: VocabularyService,
    private typeMapperService: TypeMapperService,
    private tagsMapperService: TagsMapperService,
    private valueTransformerService: ValueTransformerService,
    private collectionsService: CollectionsService,
    private notificationService: NotificationService
  ) {
    this.editWordForm = new UntypedFormGroup({
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
    this.originalTags = [];
  }

  ngOnInit(): void {
    this.initializeBasicControls();
    this.initializeTypeControls();
    if (this.fullWord!.tags) this.initializeTagControls();
    if (this.fullWord!.sentences) this.initializeSentenceControls();
  }

  getFormControl(control: string): UntypedFormControl {
    return this.editWordForm.get(control) as UntypedFormControl;
  }

  getFormGroup(group: string): UntypedFormGroup {
    return this.editWordForm.get(group) as UntypedFormGroup;
  }

  getFormArray(formArray: string): UntypedFormArray {
    return this.editWordForm.get(formArray) as UntypedFormArray;
  }

  initializeBasicControls(): void {
    this.getFormControl('spanish')!.setValue(this.fullWord!.spanish);

    if (this.fullWord!.hiragana)
      this.getFormControl('hiragana')!.setValue(this.fullWord!.hiragana);

    if (this.fullWord!.notes)
      this.getFormControl('notes')!.setValue(this.fullWord!.notes);
  }

  initializeTypeControls(): void {
    for (const [subtype, value] of Object.entries(this.fullWord!.type)) {
      const frontendSubtype: string =
        this.typeMapperService.frontendSubtypes[
          subtype as keyof FromBackendTypeMap
        ];
      const subtypeControl: UntypedFormControl = this.getFormGroup('type')!.get(
        frontendSubtype
      ) as UntypedFormControl;

      if (subtypeControl) subtypeControl.setValue(parseInt(value));
    }
  }

  initializeTagControls(): void {
    this.fullWord!.tags!.forEach((backendTag: string) => {
      const frontendTag: string =
        this.tagsMapperService.frontendTags[
          backendTag as keyof FromBackendTagsMap
        ];

      const tagControl: UntypedFormControl = this.getFormControl('tags')!.get(
        frontendTag
      ) as UntypedFormControl;

      if (tagControl) tagControl.setValue(true);
    });
  }

  initializeSentenceControls(): void {
    const sentencesArray: UntypedFormArray = this.editWordForm.get(
      'sentences'
    )! as UntypedFormArray;
    this.fullWord!.sentences!.forEach((sentence: Sentence) => {
      sentencesArray.push(
        new UntypedFormGroup({
          japanese: new UntypedFormControl(sentence.sentence, [Validators.required]),
          translation: new UntypedFormControl(sentence.translation, [
            Validators.required,
          ]),
        })
      );
    });
  }

  onSubmit(): void {
    const editWordBody: AddWordBody = this.valueTransformerService.transform(
      this.editWordForm.value,
      this.id
    );
    this.vocabularyService.updateWord(editWordBody).subscribe(
      async (_response) => {
        await this.router.navigate(['../'], { relativeTo: this.route });
        this.notificationService.toastWordUpdateNotification(
          this.fullWord!.word
        );
      },
      (error) => {
        this.notificationService.toastErrorNotification(error.error.error);
      }
    );
  }
}
