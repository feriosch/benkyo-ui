import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  VocabularyMainForm,
  VocabularyTypeForm,
  VocabularyTagsForm,
  VocabularySentenceForm,
} from 'src/models/vocabulary/forms/form.model';
import { ExistsValidatorService } from './exists-validator.service';

@Injectable({ providedIn: 'root' })
export class VocabularyFormService {
  constructor(private existsValidator: ExistsValidatorService) {}

  createNewForm(): FormGroup<VocabularyMainForm> {
    return new FormGroup<VocabularyMainForm>({
      word: new FormControl<string | null>(
        null,
        [Validators.required],
        [this.existsValidator.validate.bind(this.existsValidator)],
      ),
      hiragana: new FormControl<string | null>(null),
      spanish: new FormControl<string | null>(null, [Validators.required]),
      type: new FormGroup<VocabularyTypeForm>({
        noun: new FormControl<number>(0, { nonNullable: true }),
        suru: new FormControl<number>(0, { nonNullable: true }),
        noAdj: new FormControl<number>(0, { nonNullable: true }),
        naAdj: new FormControl<number>(0, { nonNullable: true }),
        iAdj: new FormControl<number>(0, { nonNullable: true }),
        adv: new FormControl<number>(0, { nonNullable: true }),
        verb: new FormControl<number>(0, { nonNullable: true }),
        adjNoun: new FormControl<number>(0, { nonNullable: true }),
        advNoun: new FormControl<number>(0, { nonNullable: true }),
        counter: new FormControl<number>(0, { nonNullable: true }),
      }),
      tags: new FormGroup<VocabularyTagsForm>({
        ateji: new FormControl<boolean>(false, { nonNullable: true }),
        common: new FormControl<boolean>(false, { nonNullable: true }),
        expression: new FormControl<boolean>(false, { nonNullable: true }),
        honorific: new FormControl<boolean>(false, { nonNullable: true }),
        humble: new FormControl<boolean>(false, { nonNullable: true }),
        intransitive: new FormControl<boolean>(false, { nonNullable: true }),
        jlptN1: new FormControl<boolean>(false, { nonNullable: true }),
        notJoyo: new FormControl<boolean>(false, { nonNullable: true }),
        onomatopoeic: new FormControl<boolean>(false, { nonNullable: true }),
        transitive: new FormControl<boolean>(false, { nonNullable: true }),
        usuallyKana: new FormControl<boolean>(false, { nonNullable: true }),
      }),
      notes: new FormControl<string | null>(null, [Validators.max(20)]),
      collection: new FormControl<string | null>(null, [Validators.required]),
      sentences: new FormArray<FormGroup<VocabularySentenceForm>>([]),
    });
  }
}
