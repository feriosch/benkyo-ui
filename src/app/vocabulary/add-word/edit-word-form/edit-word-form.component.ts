import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { VocabularyService } from '../../vocabulary.service';
import { ValueTransformerService } from '../value-transformer.service';
import { NotificationService } from '../../../shared/notification.service';
import { Sentence, Word } from '../../../../models/responses/vocabulary/word.model';
import { Collection } from '../../../../models/responses/vocabulary/collection.model';
import { AddWordBody } from '../../../../models/requests/add-word-body.model';


@Component({
  selector: 'app-edit-word-form',
  templateUrl: './edit-word-form.component.html',
  styleUrls: ['./edit-word-form.component.scss']
})
export class EditWordFormComponent implements OnInit {

  id: string;
  originalWord?: Word | null;
  editWordForm?: FormGroup;
  collections?: Collection[];
  originalTags: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vocabularyService: VocabularyService,
    private valueTransformerService: ValueTransformerService,
    private notificationService: NotificationService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.originalTags = [];
  }

  get spanishControl(): FormControl {
    return this.editWordForm?.get('spanish') as FormControl;
  }

  get collectionControl(): FormControl {
    return this.editWordForm?.get('collection') as FormControl;
  }

  get sentencesControl(): FormArray {
    return this.editWordForm?.get('sentences') as FormArray;
  }

  getCollections(): void {
    this.vocabularyService.getCollections().subscribe(collections => {
      this.collections = collections;
      if (this.collections.length > 0) {
        this.collectionControl!.patchValue(this.collections[0].collection_name)
      }
    })
  }

  initializeForm(): void {
    this.editWordForm = new FormGroup({
      'hiragana': new FormControl(this.originalWord?.hiragana),
      'spanish': new FormControl(this.originalWord?.spanish, [Validators.required]),
      'type': new FormGroup({
        'noun': new FormControl(this.originalWord?.type.noun, [Validators.required]),
        'suruVerb': new FormControl(this.originalWord?.type.suru_verb, [Validators.required]),
        'noAdjective': new FormControl(this.originalWord?.type.no_adjective, [Validators.required]),
        'naAdjective': new FormControl(this.originalWord?.type.na_adjective, [Validators.required]),
        'iAdjective': new FormControl(this.originalWord?.type.i_adjective, [Validators.required]),
        'adverb': new FormControl(this.originalWord?.type.adverb, [Validators.required]),
        'verb': new FormControl(this.originalWord?.type.verb, [Validators.required]),
        'adjectivalNoun': new FormControl(this.originalWord?.type.adjectival_noun, [Validators.required]),
        'adverbialNoun': new FormControl(this.originalWord?.type.adverbial_noun, [Validators.required]),
        'counter': new FormControl(this.originalWord?.type.counter, [Validators.required])
      }),
      'tags': new FormGroup({
        'ateji': new FormControl(this.originalTags.includes('ateji'), [Validators.required]),
        'common': new FormControl(this.originalTags.includes('common'), [Validators.required]),
        'expression': new FormControl(this.originalTags.includes('expression'), [Validators.required]),
        'honorific': new FormControl(this.originalTags.includes('honorific'), [Validators.required]),
        'humble': new FormControl(this.originalTags.includes('humble'), [Validators.required]),
        'intransitive': new FormControl(this.originalTags.includes('intransitive'), [Validators.required]),
        'jlptN1': new FormControl(this.originalTags.includes('jlpt_n1'), [Validators.required]),
        'notJoyo': new FormControl(this.originalTags.includes('joyogai'), [Validators.required]),
        'onomatopoeic': new FormControl(this.originalTags.includes('onomatopeic'), [Validators.required]),
        'transitive': new FormControl(this.originalTags.includes('transitive'), [Validators.required]),
        'usuallyKana': new FormControl(this.originalTags.includes('usually_kana'), [Validators.required]),
      }),
      'notes': new FormControl(this.originalWord?.notes, [Validators.max(20)]),
      'collection': new FormControl(null, [Validators.required]),
      'sentences': new FormArray([])
    });
  }

  onSubmit(): void {
    const editWordBody: AddWordBody = this.valueTransformerService.transform(this.editWordForm?.value, this.id);
    console.log(JSON.stringify(editWordBody));
    this.vocabularyService.updateWord(editWordBody)
      .subscribe(
        async (_response) => {
          await this.router.navigate(['../'], { relativeTo: this.route });
          this.notificationService.toastWordUpdateNotification(this.originalWord?.word!);
        }, (error) => {
          this.notificationService.toastErrorNotification(error.error.error);
        }
      )
  }

  async onClickCancel() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.vocabularyService.getWordById(this.id)
      .subscribe((response) => {
        this.originalWord = response;
        if (this.originalWord?.tags) {
          for (const [key] of Object.entries(this.originalWord?.tags)) {
            this.originalTags.push(key);
          }
        }
        this.initializeForm();
        this.getCollections();
        if (this.originalWord?.sentences) {
          this.originalWord?.sentences.forEach((sentence: Sentence) => {
            this.sentencesControl.push(new FormGroup({
              'japanese': new FormControl(sentence.sentence, [Validators.required]),
              'translation': new FormControl(sentence.translation, [Validators.required])
            }))
          })
        }
      });
  }
}
