import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { VocabularyService } from '../../vocabulary.service';
import { WordExistsValidator } from '../word-exists-validator.service';
import { ValueTransformerService } from '../value-transformer.service';
import { NotificationService } from '../../../shared/notification.service';
import { Collection } from '../../../../models/responses/vocabulary/collection.model';
import { AddWordBody } from '../../../../models/requests/add-word-body.model';

@Component({
  selector: 'app-add-word-form',
  templateUrl: './add-word-form.component.html',
  styleUrls: ['./add-word-form.component.scss'],
})
export class AddWordFormComponent implements OnInit {
  addWordForm: FormGroup;
  collections?: Collection[];
  initialValues: any;

  constructor(
    private vocabularyService: VocabularyService,
    private wordExistsValidator: WordExistsValidator,
    private valueTransformerService: ValueTransformerService,
    private notificationService: NotificationService
  ) {
    this.addWordForm = new FormGroup({
      word: new FormControl(
        null,
        [Validators.required],
        [this.wordExistsValidator.validate.bind(this.wordExistsValidator)]
      ),
      hiragana: new FormControl(''),
      spanish: new FormControl('', [Validators.required]),
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
      notes: new FormControl('', [Validators.max(20)]),
      collection: new FormControl(null, [Validators.required]),
      sentences: new FormArray([]),
    });
    this.initialValues = this.addWordForm.value;
  }

  ngOnInit(): void {
    this.getCollections();
  }

  get wordControl() {
    return this.addWordForm.get('word');
  }

  get spanishControl() {
    return this.addWordForm.get('spanish');
  }

  get collectionControl() {
    return this.addWordForm.get('collection');
  }

  getCollections(): void {
    this.vocabularyService.getCollections().subscribe((collections) => {
      this.collections = collections;
      if (this.collections.length > 0) {
        this.collectionControl!.patchValue(this.collections[0].collection_name);
      }
    });
  }

  isWordRepeated(): boolean {
    if (this.wordControl!.errors) {
      return this.wordControl!.errors!.hasOwnProperty('repeatedWord');
    }
    return false;
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
