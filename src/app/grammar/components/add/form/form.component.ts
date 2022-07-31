import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from 'src/app/shared/notification.service';
import { GrammarService } from 'src/app/grammar/services/grammar.service';
import { AddClauseValuesTransformerService } from 'src/app/grammar/services/add-values-transformer.service';
import { AddClauseBody } from 'src/models/requests/grammar/add-clause.model';

@Component({
  selector: 'app-add-clause-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
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
    this.initialValues = this.addClauseForm.value;
  }

  get titleControl() {
    return this.addClauseForm.get('title');
  }

  onSubmit(): void {
    const addClauseBody: AddClauseBody = this.valueTransformerService.transform(
      this.addClauseForm.value
    );
    console.log(addClauseBody);
  }

  ngOnInit(): void {}
}
