import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Example,
  Formation,
  FullClause,
  Related,
  Section,
} from 'src/models/responses/grammar/clause.model';
import {
  ExampleForm,
  FormationForm,
  MainForm,
  NoteForm,
  RelatedForm,
  RelatedSectionForm,
  TagsForm,
  TypeForm,
} from 'src/models/grammar/forms/form';
import { AddClauseBody } from 'src/models/requests/grammar/add-clause.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { SentenceFormatterService } from 'src/app/grammar/services/sentence-formatter.service';
import { AddClauseValuesTransformerService } from 'src/app/grammar/services/add-values-transformer.service';
import { GrammarService } from 'src/app/grammar/services/grammar.service';

@Component({
  selector: 'app-edit-clause-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditClauseFormComponent implements OnInit {
  @Input()
  clause?: FullClause;

  @Input()
  id?: string;

  editClauseForm: FormGroup<MainForm>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sentenceFormatterService: SentenceFormatterService,
    private valueTransformerService: AddClauseValuesTransformerService,
    private grammarService: GrammarService,
    private notificationService: NotificationService,
  ) {
    this.editClauseForm = new FormGroup<MainForm>({
      title: new FormControl<string | null>(null, [Validators.required]),
      hiragana: new FormControl<string | null>(null),
      translation: new FormControl<string | null>(null, [Validators.required]),
      level: new FormControl<string | null>(null, [Validators.required]),
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
  }

  ngOnInit(): void {
    this.initializeBasicControls();
    this.initializeTypeControls();
    if (this.clause!.tags) this.initializeTagControls();
    this.initializeKeyControls();
    this.initializeFormationControls();
    if (this.clause!.examples) this.initializeExampleControls();
    this.initializeNoteControls();
    if (this.clause!.related) this.initializeRelatedControls();
  }

  getFormControl(control: string): FormControl {
    return this.editClauseForm.get(control) as FormControl;
  }

  getFormGroup(group: string): FormGroup {
    return this.editClauseForm.get(group) as FormGroup;
  }

  getFormArray(array: string): FormArray {
    return this.editClauseForm.get(array) as FormArray;
  }

  getNewExampleFormGroup(
    sentenceComponents: string[],
    translation: string,
  ): FormGroup<ExampleForm> {
    return new FormGroup<ExampleForm>({
      sentence: new FormControl<string | null>(
        this.sentenceFormatterService.getFrontFormattedSentence(
          sentenceComponents,
        ),
        [Validators.required],
      ),
      translation: new FormControl<string | null>(translation, [
        Validators.required,
      ]),
    });
  }

  initializeBasicControls(): void {
    this.getFormControl('title')!.setValue(this.clause!.title);
    this.getFormControl('hiragana')!.setValue(this.clause!.hiragana || null);
    this.getFormControl('translation')!.setValue(this.clause!.translation);
    this.getFormControl('level')!.setValue(this.clause!.level);
    this.getFormControl('definition')!.setValue(this.clause!.definition);
  }

  initializeTypeControls(): void {
    const originalSubtypes: string[] = [];
    for (const [key] of Object.entries(this.clause!.type))
      originalSubtypes.push(key);

    originalSubtypes.forEach((subtype: string) =>
      this.getFormControl(`type.${subtype}`).setValue(true),
    );
  }

  initializeTagControls(): void {
    const originalTags: string[] = [];
    for (const [key] of Object.entries(this.clause!.tags!))
      originalTags.push(key);

    originalTags.forEach((tag: string) =>
      this.getFormControl(`tags.${tag}`).setValue(true),
    );
  }

  initializeKeyControls(): void {
    this.clause!.keys.forEach((key: Example) => {
      this.getFormArray('keys')!.push(
        this.getNewExampleFormGroup(key.sentence, key.translation),
      );
    });
  }

  initializeFormationControls(): void {
    this.clause!.formations.forEach((formation: Formation) => {
      const formGroup: FormGroup<FormationForm> = new FormGroup<FormationForm>({
        rule: new FormControl<string | null>(formation.rule, [
          Validators.required,
        ]),
        examples: new FormArray<FormGroup<ExampleForm>>([]),
      });
      this.getFormArray('formations')!.push(formGroup);
      const examplesArray: FormArray<FormGroup<ExampleForm>> = formGroup.get(
        'examples',
      ) as FormArray<FormGroup<ExampleForm>>;
      formation.examples.forEach((example: Example) => {
        examplesArray.push(
          this.getNewExampleFormGroup(example.sentence, example.translation),
        );
      });
    });
  }

  initializeExampleControls(): void {
    this.clause!.examples!.forEach((example: Example) => {
      this.getFormArray('examples')!.push(
        this.getNewExampleFormGroup(example.sentence, example.translation),
      );
    });
  }

  initializeNoteControls(): void {
    this.clause!.notes.forEach((note: Section) => {
      const formGroup: FormGroup<NoteForm> = new FormGroup<NoteForm>({
        explanation: new FormControl<string | null>(note.explanation, [
          Validators.required,
        ]),
        examples: new FormArray<FormGroup<ExampleForm>>([]),
      });
      this.getFormArray('notes')!.push(formGroup);
      const examplesArray: FormArray<FormGroup<ExampleForm>> = formGroup.get(
        'examples',
      ) as FormArray<FormGroup<ExampleForm>>;
      if (note.examples) {
        note.examples!.forEach((example: Example) => {
          examplesArray!.push(
            this.getNewExampleFormGroup(example.sentence, example.translation),
          );
        });
      }
    });
  }

  initializeRelatedControls(): void {
    this.clause!.related!.forEach((related: Related) => {
      const formGroup: FormGroup<RelatedForm> = new FormGroup<RelatedForm>({
        title: new FormControl<string | null>(related.title, [
          Validators.required,
        ]),
        hiragana: new FormControl<string | null>(related.hiragana || null),
        reference: new FormControl<string | null>(related.reference || null),
        sections: new FormArray<FormGroup<RelatedSectionForm>>([]),
      });
      this.getFormArray('related')!.push(formGroup);
      const sectionsArray: FormArray<FormGroup<RelatedSectionForm>> =
        formGroup.get('sections') as FormArray<FormGroup<RelatedSectionForm>>;
      related.sections.forEach((section: Section) => {
        const sectionFormGroup: FormGroup<RelatedSectionForm> =
          new FormGroup<RelatedSectionForm>({
            explanation: new FormControl<string | null>(section.explanation, [
              Validators.required,
            ]),
            examples: new FormArray<FormGroup<ExampleForm>>([]),
          });
        sectionsArray.push(sectionFormGroup);
        const examplesArray: FormArray<FormGroup<ExampleForm>> =
          sectionFormGroup.get('examples') as FormArray<FormGroup<ExampleForm>>;
        if (section.examples) {
          section.examples!.forEach((example: Example) => {
            examplesArray!.push(
              this.getNewExampleFormGroup(
                example.sentence,
                example.translation,
              ),
            );
          });
        }
      });
    });
  }

  onSubmit(): void {
    const editClauseBody: AddClauseBody =
      this.valueTransformerService.transform(
        this.editClauseForm.value,
        this.id!,
      );
    this.grammarService.updateClause(editClauseBody).subscribe(
      async (_response) => {
        await this.router.navigate(['../'], { relativeTo: this.route });
        this.notificationService.toastClauseCreationNotification();
      },
      (error) => {
        this.notificationService.toastErrorNotification(error.error.error);
      },
    );
  }
}
