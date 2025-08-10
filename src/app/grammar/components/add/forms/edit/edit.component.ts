import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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

  editClauseForm: UntypedFormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sentenceFormatterService: SentenceFormatterService,
    private valueTransformerService: AddClauseValuesTransformerService,
    private grammarService: GrammarService,
    private notificationService: NotificationService
  ) {
    this.editClauseForm = new UntypedFormGroup({
      title: new UntypedFormControl(null, [Validators.required]),
      hiragana: new UntypedFormControl(null),
      translation: new UntypedFormControl(null, [Validators.required]),
      level: new UntypedFormControl(null, [Validators.required]),
      type: new UntypedFormGroup({
        adjective: new UntypedFormControl(false),
        adverb: new UntypedFormControl(false),
        auxiliary: new UntypedFormControl(false),
        conjunction: new UntypedFormControl(false),
        modifier: new UntypedFormControl(false),
        noun: new UntypedFormControl(false),
        particle: new UntypedFormControl(false),
        phrase: new UntypedFormControl(false),
        structure: new UntypedFormControl(false),
        suffix: new UntypedFormControl(false),
      }),
      tags: new UntypedFormGroup({
        spoken: new UntypedFormControl(false),
        written: new UntypedFormControl(false),
        formal: new UntypedFormControl(false),
        colloquial: new UntypedFormControl(false),
        interrogative: new UntypedFormControl(false),
      }),
      definition: new UntypedFormControl(null, [Validators.required]),
      keys: new UntypedFormArray([]),
      formations: new UntypedFormArray([]),
      examples: new UntypedFormArray([]),
      notes: new UntypedFormArray([]),
      related: new UntypedFormArray([]),
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

  getFormControl(control: string): UntypedFormControl {
    return this.editClauseForm.get(control) as UntypedFormControl;
  }

  getFormGroup(group: string): UntypedFormGroup {
    return this.editClauseForm.get(group) as UntypedFormGroup;
  }

  getFormArray(array: string): UntypedFormArray {
    return this.editClauseForm.get(array) as UntypedFormArray;
  }

  getNewExampleFormGroup(
    sentenceComponents: string[],
    translation: string
  ): UntypedFormGroup {
    return new UntypedFormGroup({
      sentence: new UntypedFormControl(
        this.sentenceFormatterService.getFrontFormattedSentence(
          sentenceComponents
        ),
        [Validators.required]
      ),
      translation: new UntypedFormControl(translation, [Validators.required]),
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
      const formGroup: UntypedFormGroup = new UntypedFormGroup({
        rule: new UntypedFormControl(formation.rule, [Validators.required]),
        examples: new UntypedFormArray([]),
      });
      this.getFormArray('formations')!.push(formGroup);
      const examplesArray: UntypedFormArray = formGroup.get('examples') as UntypedFormArray;
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
      const formGroup: UntypedFormGroup = new UntypedFormGroup({
        explanation: new UntypedFormControl(note.explanation, [Validators.required]),
        examples: new UntypedFormArray([]),
      });
      this.getFormArray('notes')!.push(formGroup);
      const examplesArray: UntypedFormArray = formGroup.get('examples') as UntypedFormArray;
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
      const formGroup: UntypedFormGroup = new UntypedFormGroup({
        title: new UntypedFormControl(related.title, [Validators.required]),
        hiragana: new UntypedFormControl(related.hiragana || null),
        reference: new UntypedFormControl(related.reference || null),
        sections: new UntypedFormArray([]),
      });
      this.getFormArray('related')!.push(formGroup);
      const sectionsArray: UntypedFormArray = formGroup.get('sections') as UntypedFormArray;
      related.sections.forEach((section: Section) => {
        const sectionFormGroup: UntypedFormGroup = new UntypedFormGroup({
          explanation: new UntypedFormControl(section.explanation, [
            Validators.required,
          ]),
          examples: new UntypedFormArray([]),
        });
        sectionsArray.push(sectionFormGroup);
        const examplesArray: UntypedFormArray = sectionFormGroup.get(
          'examples'
        ) as UntypedFormArray;
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
