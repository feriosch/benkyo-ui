import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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

  editWordForm: FormGroup;
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
    this.editWordForm = new FormGroup({
      hiragana: new FormControl(null),
      spanish: new FormControl(null, [Validators.required]),
      type: new FormGroup({
        noun: new FormControl(0, [Validators.required]),
        suru: new FormControl(0, [Validators.required]),
        noAdj: new FormControl(0, [Validators.required]),
        naAdj: new FormControl(0, [Validators.required]),
        iAdj: new FormControl(0, [Validators.required]),
        adv: new FormControl(0, [Validators.required]),
        verb: new FormControl(0, [Validators.required]),
        adjNoun: new FormControl(0, [Validators.required]),
        advNoun: new FormControl(0, [Validators.required]),
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
      const subtypeControl: FormControl = this.getFormGroup('type')!.get(
        frontendSubtype
      ) as FormControl;

      if (subtypeControl) subtypeControl.setValue(parseInt(value));
    }
  }

  initializeTagControls(): void {
    this.fullWord!.tags!.forEach((backendTag: string) => {
      const frontendTag: string =
        this.tagsMapperService.frontendTags[
          backendTag as keyof FromBackendTagsMap
        ];

      const tagControl: FormControl = this.getFormControl('tags')!.get(
        frontendTag
      ) as FormControl;

      if (tagControl) tagControl.setValue(true);
    });
  }

  initializeSentenceControls(): void {
    const sentencesArray: FormArray = this.editWordForm.get(
      'sentences'
    )! as FormArray;
    this.fullWord!.sentences!.forEach((sentence: Sentence) => {
      sentencesArray.push(
        new FormGroup({
          japanese: new FormControl(sentence.sentence, [Validators.required]),
          translation: new FormControl(sentence.translation, [
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
