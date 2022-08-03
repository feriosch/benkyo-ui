import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Example, FullClause } from 'src/models/responses/grammar/clause.model';
import { SentenceFormatterService } from 'src/app/grammar/services/sentence-formatter.service';

@Component({
  selector: 'app-edit-clause-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditClauseFormComponent implements OnInit {
  @Input()
  clause?: FullClause;

  editClauseForm: FormGroup;

  constructor(private sentenceFormatterService: SentenceFormatterService) {
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
    });
  }

  ngOnInit(): void {
    console.log(this.clause!);
    this.initializeBasicControls();
    this.initializeTypeControls();
    if (this.clause!.tags) this.initializeTagControls();
    this.initializeKeyControls();
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
        new FormGroup({
          sentence: new FormControl(
            this.sentenceFormatterService.getFrontFormattedSentence(
              key.sentence
            ),
            [Validators.required]
          ),
          translation: new FormControl(key.translation, [Validators.required]),
        })
      );
    });
  }

  onSubmit(): void {
    console.log(this.editClauseForm.value);
  }
}
