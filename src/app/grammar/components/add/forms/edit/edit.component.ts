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

  editClauseForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sentenceFormatterService: SentenceFormatterService,
    private valueTransformerService: AddClauseValuesTransformerService,
    private grammarService: GrammarService,
    private notificationService: NotificationService
  ) {
    this.editClauseForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      hiragana: new FormControl(null),
      translation: new FormControl(null, [Validators.required]),
      level: new FormControl(null, [Validators.required]),
      type: new FormGroup({
        adjective: new FormControl(false),
        adverb: new FormControl(false),
        auxiliary: new FormControl(false),
        conjunction: new FormControl(false),
        modifier: new FormControl(false),
        noun: new FormControl(false),
        particle: new FormControl(false),
        phrase: new FormControl(false),
        structure: new FormControl(false),
        suffix: new FormControl(false),
      }),
      tags: new FormGroup({
        spoken: new FormControl(false),
        written: new FormControl(false),
        formal: new FormControl(false),
        colloquial: new FormControl(false),
        interrogative: new FormControl(false),
      }),
      definition: new FormControl(null, [Validators.required]),
      keys: new FormArray([]),
      formations: new FormArray([]),
      examples: new FormArray([]),
      notes: new FormArray([]),
      related: new FormArray([]),
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
    translation: string
  ): FormGroup {
    return new FormGroup({
      sentence: new FormControl(
        this.sentenceFormatterService.getFrontFormattedSentence(
          sentenceComponents
        ),
        [Validators.required]
      ),
      translation: new FormControl(translation, [Validators.required]),
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
      this.getFormControl(`type.${subtype}`).setValue(true)
    );
  }

  initializeTagControls(): void {
    const originalTags: string[] = [];
    for (const [key] of Object.entries(this.clause!.tags!))
      originalTags.push(key);

    originalTags.forEach((tag: string) =>
      this.getFormControl(`tags.${tag}`).setValue(true)
    );
  }

  initializeKeyControls(): void {
    this.clause!.keys.forEach((key: Example) => {
      this.getFormArray('keys')!.push(
        this.getNewExampleFormGroup(key.sentence, key.translation)
      );
    });
  }

  initializeFormationControls(): void {
    this.clause!.formations.forEach((formation: Formation) => {
      const formGroup: FormGroup = new FormGroup({
        rule: new FormControl(formation.rule, [Validators.required]),
        examples: new FormArray([]),
      });
      this.getFormArray('formations')!.push(formGroup);
      const examplesArray: FormArray = formGroup.get('examples') as FormArray;
      formation.examples.forEach((example: Example) => {
        examplesArray.push(
          this.getNewExampleFormGroup(example.sentence, example.translation)
        );
      });
    });
  }

  initializeExampleControls(): void {
    this.clause!.examples!.forEach((example: Example) => {
      this.getFormArray('examples')!.push(
        this.getNewExampleFormGroup(example.sentence, example.translation)
      );
    });
  }

  initializeNoteControls(): void {
    this.clause!.notes.forEach((note: Section) => {
      const formGroup: FormGroup = new FormGroup({
        explanation: new FormControl(note.explanation, [Validators.required]),
        examples: new FormArray([]),
      });
      this.getFormArray('notes')!.push(formGroup);
      const examplesArray: FormArray = formGroup.get('examples') as FormArray;
      if (note.examples) {
        note.examples!.forEach((example: Example) => {
          examplesArray!.push(
            this.getNewExampleFormGroup(example.sentence, example.translation)
          );
        });
      }
    });
  }

  initializeRelatedControls(): void {
    this.clause!.related!.forEach((related: Related) => {
      const formGroup: FormGroup = new FormGroup({
        title: new FormControl(related.title, [Validators.required]),
        hiragana: new FormControl(related.hiragana || null),
        reference: new FormControl(related.reference || null),
        sections: new FormArray([]),
      });
      this.getFormArray('related')!.push(formGroup);
      const sectionsArray: FormArray = formGroup.get('sections') as FormArray;
      related.sections.forEach((section: Section) => {
        const sectionFormGroup: FormGroup = new FormGroup({
          explanation: new FormControl(section.explanation, [
            Validators.required,
          ]),
          examples: new FormArray([]),
        });
        sectionsArray.push(sectionFormGroup);
        const examplesArray: FormArray = sectionFormGroup.get(
          'examples'
        ) as FormArray;
        if (section.examples) {
          section.examples!.forEach((example: Example) => {
            examplesArray!.push(
              this.getNewExampleFormGroup(example.sentence, example.translation)
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
        this.id!
      );
    this.grammarService.updateClause(editClauseBody).subscribe(
      async (_response) => {
        await this.router.navigate(['../'], { relativeTo: this.route });
        this.notificationService.toastClauseCreationNotification();
      },
      (error) => {
        this.notificationService.toastErrorNotification(error.error.error);
      }
    );
  }
}
