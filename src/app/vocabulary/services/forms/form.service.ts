import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  VocabularyMainForm,
  VocabularyFormValues,
  VocabularyTypeForm,
  VocabularyTagsForm,
  VocabularySentenceForm,
} from 'src/models/vocabulary/forms/form.model';
import { ExistsValidatorService } from './exists-validator.service';

@Injectable({ providedIn: 'root' })
export class VocabularyFormService {
  _form?: FormGroup<VocabularyMainForm>;
  vocabularyFormDataKey: string;

  constructor(private existsValidator: ExistsValidatorService) {
    this.vocabularyFormDataKey = 'vocabulary_form';
  }

  private get form(): FormGroup<VocabularyMainForm> {
    return this._form!;
  }

  private set form(formGroup: FormGroup<VocabularyMainForm>) {
    this._form = formGroup;
  }

  private get cachedData(): VocabularyFormValues | null {
    const data = localStorage.getItem(this.vocabularyFormDataKey);
    if (data) return <VocabularyFormValues>JSON.parse(data);
    else return null;
  }

  private getFormControl(control: string): FormControl {
    return this.form.get(control)! as FormControl;
  }

  private getFormGroup(group: string): FormGroup {
    return this.form.get(group)! as FormGroup;
  }

  private getFormArray(array: string): FormArray {
    return this.form.get(array)! as FormArray;
  }

  private createNewSentenceForm(): FormGroup<VocabularySentenceForm> {
    return new FormGroup<VocabularySentenceForm>({
      japanese: new FormControl<string | null>(null),
      translation: new FormControl<string | null>(null),
    });
  }

  private initializeBasicControls(): void {
    this.getFormControl('word').setValue(this.cachedData!.word);
    this.getFormControl('hiragana').setValue(this.cachedData!.hiragana);
    this.getFormControl('spanish').setValue(this.cachedData!.spanish);
    this.getFormControl('notes').setValue(this.cachedData!.notes);
    this.getFormControl('collection').setValue(this.cachedData!.collection);
  }

  private initializeTypeControls(): void {
    const typeGroup = this.getFormGroup('type');
    typeGroup.get('noun')?.setValue(this.cachedData!.type.noun);
    typeGroup.get('suru')?.setValue(this.cachedData!.type.suru);
    typeGroup.get('noAdj')?.setValue(this.cachedData!.type.noAdj);
    typeGroup.get('naAdj')?.setValue(this.cachedData!.type.naAdj);
    typeGroup.get('iAdj')?.setValue(this.cachedData!.type.iAdj);
    typeGroup.get('adv')?.setValue(this.cachedData!.type.adv);
    typeGroup.get('verb')?.setValue(this.cachedData!.type.verb);
    typeGroup.get('adjNoun')?.setValue(this.cachedData!.type.adjNoun);
    typeGroup.get('advNoun')?.setValue(this.cachedData!.type.advNoun);
    typeGroup.get('counter')?.setValue(this.cachedData!.type.counter);
  }

  private initializeTagsControls(): void {
    const tagsGroup = this.getFormGroup('tags');
    tagsGroup.get('ateji')?.setValue(this.cachedData!.tags.ateji);
    tagsGroup.get('common')?.setValue(this.cachedData!.tags.common);
    tagsGroup.get('expression')?.setValue(this.cachedData!.tags.expression);
    tagsGroup.get('honorific')?.setValue(this.cachedData!.tags.honorific);
    tagsGroup.get('humble')?.setValue(this.cachedData!.tags.humble);
    tagsGroup.get('intransitive')?.setValue(this.cachedData!.tags.intransitive);
    tagsGroup.get('jlptN1')?.setValue(this.cachedData!.tags.jlptN1);
    tagsGroup.get('notJoyo')?.setValue(this.cachedData!.tags.notJoyo);
    tagsGroup.get('onomatopoeic')?.setValue(this.cachedData!.tags.onomatopoeic);
    tagsGroup.get('transitive')?.setValue(this.cachedData!.tags.transitive);
    tagsGroup.get('usuallyKana')?.setValue(this.cachedData!.tags.usuallyKana);
  }

  private initializeSentenceControls(): void {
    const sentencesArray = this.getFormArray('sentences') as FormArray<
      FormGroup<VocabularySentenceForm>
    >;

    this.cachedData!.sentences.forEach((sentence: any) => {
      const sentenceForm = this.createNewSentenceForm();
      sentenceForm.get('japanese')?.setValue(sentence.japanese);
      sentenceForm.get('translation')?.setValue(sentence.translation);
      sentencesArray.push(sentenceForm);
    });
  }

  initializeForm(form: FormGroup<VocabularyMainForm>): void {
    this.form = form;
    if (this.cachedData) {
      this.initializeBasicControls();
      this.initializeTypeControls();
      this.initializeTagsControls();
      this.initializeSentenceControls();
    }
  }

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

  resetFormArray(name: string): void {
    const formArray = this.form.get(name)! as FormArray;
    while (formArray.length !== 0) formArray.removeAt(0);
  }

  resetFormValues(): void {
    this.resetFormArray('sentences');
    this.form.reset();
  }
}
