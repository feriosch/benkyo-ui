import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { AddClauseBody } from 'src/models/requests/grammar/add-clause.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { GrammarService } from 'src/app/grammar/services/grammar.service';
import { AddClauseValuesTransformerService } from 'src/app/grammar/services/add-values-transformer.service';
import { AddFormService } from 'src/app/grammar/services/forms/add.service';

@Component({
  selector: 'app-add-clause-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddClauseFormComponent implements OnInit {
  addClauseForm: UntypedFormGroup;
  initialValues: any;

  constructor(
    private grammarService: GrammarService,
    private valueTransformerService: AddClauseValuesTransformerService,
    private notificationService: NotificationService,
    private addFormService: AddFormService
  ) {
    this.addClauseForm = new UntypedFormGroup({
      title: new UntypedFormControl(null, [Validators.required]),
      hiragana: new UntypedFormControl(null),
      translation: new UntypedFormControl(null, [Validators.required]),
      level: new UntypedFormControl('intermediate', [Validators.required]),
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
    this.initialValues = this.addClauseForm.value;
  }

  ngOnInit(): void {
    this.addFormService.initializeForm(this.addClauseForm);
  }

  getFormGroup(formGroup: string): UntypedFormGroup {
    return this.addClauseForm.get(formGroup) as UntypedFormGroup;
  }

  getFormArray(formArray: string): UntypedFormArray {
    return this.addClauseForm.get(formArray) as UntypedFormArray;
  }

  storeValues() {
    this.addFormService.setCachedValues(this.addClauseForm.value);
  }

  resetFormArray(name: string): void {
    const formArray = this.addClauseForm.get(name)! as UntypedFormArray;
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
