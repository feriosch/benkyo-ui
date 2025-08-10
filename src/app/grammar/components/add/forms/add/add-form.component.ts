import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { AddClauseBody } from 'src/models/requests/grammar/add-clause.model';
import { NotificationService } from 'src/app/shared/notification.service';
import {
  MainForm,
  ExampleForm,
  FormationForm,
  NoteForm,
  RelatedForm,
  TagsForm,
  TypeForm,
} from 'src/models/grammar/forms/form';
import { GrammarService } from 'src/app/grammar/services/grammar.service';
import { AddClauseValuesTransformerService } from 'src/app/grammar/services/add-values-transformer.service';
import { AddFormService } from 'src/app/grammar/services/forms/add.service';

@Component({
  selector: 'app-add-clause-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddClauseFormComponent implements OnInit {
  addClauseForm: FormGroup<MainForm>;
  initialValues: any;

  constructor(
    private grammarService: GrammarService,
    private valueTransformerService: AddClauseValuesTransformerService,
    private notificationService: NotificationService,
    private addFormService: AddFormService,
  ) {
    this.addClauseForm = new FormGroup<MainForm>({
      title: new FormControl<string | null>(null, [Validators.required]),
      hiragana: new FormControl<string | null>(null),
      translation: new FormControl<string | null>(null, [Validators.required]),
      level: new FormControl<string | null>('intermediate', [
        Validators.required,
      ]),
      type: new FormGroup<TypeForm>({
        adjective: new FormControl<boolean>(false, { nonNullable: true }),
        adverb: new FormControl<boolean>(false, { nonNullable: true }),
        auxiliary: new FormControl<boolean>(false, { nonNullable: true }),
        conjunction: new FormControl<boolean>(false, { nonNullable: true }),
        modifier: new FormControl<boolean>(false, { nonNullable: true }),
        noun: new FormControl<boolean>(false, { nonNullable: true }),
        particle: new FormControl<boolean>(false, { nonNullable: true }),
        phrase: new FormControl<boolean>(false, { nonNullable: true }),
        structure: new FormControl<boolean>(false, { nonNullable: true }),
        suffix: new FormControl<boolean>(false, { nonNullable: true }),
      }),
      tags: new FormGroup<TagsForm>({
        spoken: new FormControl<boolean>(false, { nonNullable: true }),
        written: new FormControl<boolean>(false, { nonNullable: true }),
        formal: new FormControl<boolean>(false, { nonNullable: true }),
        colloquial: new FormControl<boolean>(false, { nonNullable: true }),
        interrogative: new FormControl<boolean>(false, { nonNullable: true }),
      }),
      definition: new FormControl<string | null>(null, [Validators.required]),
      keys: new FormArray<FormGroup<ExampleForm>>([]),
      formations: new FormArray<FormGroup<FormationForm>>([]),
      examples: new FormArray<FormGroup<ExampleForm>>([]),
      notes: new FormArray<FormGroup<NoteForm>>([]),
      related: new FormArray<FormGroup<RelatedForm>>([]),
    });
    this.initialValues = this.addClauseForm.value;
  }

  ngOnInit(): void {
    this.addFormService.initializeForm(this.addClauseForm);
  }

  getFormGroup(formGroup: string): FormGroup {
    return this.addClauseForm.get(formGroup) as FormGroup;
  }

  getFormArray(formArray: string): FormArray {
    return this.addClauseForm.get(formArray) as FormArray;
  }

  storeValues() {
    const formValue = this.addClauseForm.value;
    const transformedValues = {
      title: formValue.title || null,
      hiragana: formValue.hiragana || null,
      translation: formValue.translation || null,
      level: formValue.level || 'intermediate',
      type: {
        adjective: formValue.type?.adjective ?? false,
        adverb: formValue.type?.adverb ?? false,
        auxiliary: formValue.type?.auxiliary ?? false,
        conjunction: formValue.type?.conjunction ?? false,
        modifier: formValue.type?.modifier ?? false,
        noun: formValue.type?.noun ?? false,
        particle: formValue.type?.particle ?? false,
        phrase: formValue.type?.phrase ?? false,
        structure: formValue.type?.structure ?? false,
        suffix: formValue.type?.suffix ?? false,
      },
      tags: {
        spoken: formValue.tags?.spoken ?? false,
        written: formValue.tags?.written ?? false,
        formal: formValue.tags?.formal ?? false,
        colloquial: formValue.tags?.colloquial ?? false,
        interrogative: formValue.tags?.interrogative ?? false,
      },
      definition: formValue.definition || null,
      keys: (formValue.keys || []).map((key: any) => ({
        sentence: key.sentence || null,
        translation: key.translation || null,
      })),
      formations: (formValue.formations || []).map((formation: any) => ({
        rule: formation.rule || null,
        examples: (formation.examples || []).map((example: any) => ({
          sentence: example.sentence || null,
          translation: example.translation || null,
        })),
      })),
      examples: (formValue.examples || []).map((example: any) => ({
        sentence: example.sentence || null,
        translation: example.translation || null,
      })),
      notes: (formValue.notes || []).map((note: any) => ({
        explanation: note.explanation || null,
        examples: (note.examples || []).map((example: any) => ({
          sentence: example.sentence || null,
          translation: example.translation || null,
        })),
      })),
      related: (formValue.related || []).map((related: any) => ({
        title: related.title || null,
        hiragana: related.hiragana || null,
        reference: related.reference || null,
        sections: (related.sections || []).map((section: any) => ({
          explanation: section.explanation || null,
          examples: (section.examples || []).map((example: any) => ({
            sentence: example.sentence || null,
            translation: example.translation || null,
          })),
        })),
      })),
    };
    this.addFormService.setCachedValues(transformedValues);
  }

  resetFormArray(name: string): void {
    const formArray = this.addClauseForm.get(name)! as FormArray;
    while (formArray.length !== 0) formArray.removeAt(0);
  }

  resetFormValues(): void {
    this.addFormService.setCachedValues(null);
    this.resetFormArray('keys');
    this.resetFormArray('formations');
    this.resetFormArray('examples');
    this.resetFormArray('notes');
    this.resetFormArray('related');
    this.addClauseForm.reset(this.initialValues);
  }

  onSubmit(): void {
    const addClauseBody: AddClauseBody = this.valueTransformerService.transform(
      this.addClauseForm.value,
    );
    this.grammarService.addClause(addClauseBody).subscribe(
      (_response) => {
        this.notificationService.toastClauseCreationNotification();
        this.resetFormValues();
      },
      (error) => {
        this.notificationService.toastErrorNotification(error.error.error);
      },
    );
  }
}
