import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { AddClauseBody } from 'src/models/requests/grammar/add-clause.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { GrammarService } from 'src/app/grammar/services/grammar.service';
import { AddClauseValuesTransformerService } from 'src/app/grammar/services/add-values-transformer.service';

@Component({
  selector: 'app-add-clause-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddClauseFormComponent implements OnInit {
  addClauseForm: FormGroup;
  initialValues: any;

  constructor(
    private grammarService: GrammarService,
    private valueTransformerService: AddClauseValuesTransformerService,
    private notificationService: NotificationService
  ) {
    this.addClauseForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      hiragana: new FormControl(null),
      translation: new FormControl(null, [Validators.required]),
      level: new FormControl('intermediate', [Validators.required]),
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
    this.initialValues = this.addClauseForm.value;
  }

  ngOnInit(): void {}

  resetFormArray(name: string): void {
    const formArray = this.addClauseForm.get(name)! as FormArray;
    while (formArray.length !== 0) formArray.removeAt(0);
  }

  resetFormValues(): void {
    this.resetFormArray('keys');
    this.resetFormArray('formations');
    this.resetFormArray('examples');
    this.resetFormArray('notes');
    this.resetFormArray('related');
    this.addClauseForm.reset(this.initialValues);
  }

  onSubmit(): void {
    const addClauseBody: AddClauseBody = this.valueTransformerService.transform(
      this.addClauseForm.value
    );
    this.grammarService.addClause(addClauseBody).subscribe(
      (_response) => {
        this.notificationService.toastClauseCreationNotification();
        this.resetFormValues();
      },
      (error) => {
        this.notificationService.toastErrorNotification(error.error.error);
      }
    );
  }
}
