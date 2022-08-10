import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ClauseFormValues } from 'src/models/grammar/forms/form';
import {
  Example,
  Formation,
  Related,
  Section,
} from 'src/models/grammar/forms/controls';

@Injectable({ providedIn: 'root' })
export class AddFormService {
  _form?: FormGroup;
  addFormDataKey: string;

  constructor() {
    this.addFormDataKey = 'add_clause_form';
  }

  private get form(): FormGroup {
    return this._form!;
  }

  private set form(formGroup: FormGroup) {
    this._form = formGroup;
  }

  private get cachedData(): ClauseFormValues | null {
    const data = localStorage.getItem(this.addFormDataKey);
    if (data) return <ClauseFormValues>JSON.parse(data);
    else return null;
  }

  private set cachedData(data: ClauseFormValues | null) {
    if (data)
      localStorage.setItem(
        this.addFormDataKey,
        JSON.stringify(<ClauseFormValues>data)
      );
    else localStorage.removeItem(this.addFormDataKey);
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

  private getNewExampleFormGroup(example: Example): FormGroup {
    return new FormGroup({
      sentence: new FormControl(example.sentence, [Validators.required]),
      translation: new FormControl(example.translation, [Validators.required]),
    });
  }

  private initializeBasicControls(): void {
    this.getFormControl('title').setValue(this.cachedData!.title);
    this.getFormControl('hiragana').setValue(this.cachedData!.hiragana);
    this.getFormControl('translation').setValue(this.cachedData!.translation);
    this.getFormControl('level').setValue(this.cachedData!.level);
    this.getFormGroup('type').setValue(this.cachedData!.type);
    this.getFormGroup('tags').setValue(this.cachedData!.tags);
    this.getFormControl('definition').setValue(this.cachedData!.definition);
  }

  private initializeKeyControls(): void {
    const keysArray: FormArray = this.getFormArray('keys');
    this.cachedData!.keys.forEach((key: Example) => {
      keysArray.push(this.getNewExampleFormGroup(key));
    });
  }

  private initializeFormationControls(): void {
    const formationsArray: FormArray = this.getFormArray('formations');
    this.cachedData!.formations.forEach((formation: Formation) => {
      const formGroup: FormGroup = new FormGroup({
        rule: new FormControl(formation.rule, [Validators.required]),
        examples: new FormArray([]),
      });
      const examplesArray: FormArray = formGroup.get('examples') as FormArray;
      formation.examples.forEach((example: Example) => {
        examplesArray.push(this.getNewExampleFormGroup(example));
      });
      formationsArray.push(formGroup);
    });
  }

  private initializeExampleControls(): void {
    const examplesArray: FormArray = this.getFormArray('examples');
    this.cachedData!.examples!.forEach((example: Example) => {
      examplesArray.push(this.getNewExampleFormGroup(example));
    });
  }

  private initializeNoteControls(): void {
    this.cachedData!.notes.forEach((note: Section) => {
      const formGroup: FormGroup = new FormGroup({
        explanation: new FormControl(note.explanation, [Validators.required]),
        examples: new FormArray([]),
      });
      const examplesArray: FormArray = formGroup.get('examples') as FormArray;
      note.examples!.forEach((example: Example) => {
        examplesArray!.push(this.getNewExampleFormGroup(example));
      });
      this.getFormArray('notes')!.push(formGroup);
    });
  }

  private initializeRelatedControls(): void {
    this.cachedData!.related!.forEach((related: Related) => {
      const formGroup: FormGroup = new FormGroup({
        title: new FormControl(related.title, [Validators.required]),
        hiragana: new FormControl(related.hiragana),
        reference: new FormControl(related.reference),
        sections: new FormArray([]),
      });
      const sectionsArray: FormArray = formGroup.get('sections') as FormArray;
      related.sections.forEach((section: Section) => {
        const sectionFormGroup: FormGroup = new FormGroup({
          explanation: new FormControl(section.explanation, [
            Validators.required,
          ]),
          examples: new FormArray([]),
        });
        const examplesArray: FormArray = sectionFormGroup.get(
          'examples'
        ) as FormArray;
        if (section.examples) {
          section.examples!.forEach((example: Example) => {
            examplesArray!.push(this.getNewExampleFormGroup(example));
          });
        }
        sectionsArray.push(sectionFormGroup);
      });
      this.getFormArray('related')!.push(formGroup);
    });
  }

  initializeForm(form: FormGroup): void {
    this.form = form;
    if (this.cachedData) {
      this.initializeBasicControls();
      this.initializeKeyControls();
      this.initializeFormationControls();
      this.initializeExampleControls();
      this.initializeNoteControls();
      this.initializeRelatedControls();
    }
  }

  setCachedValues(values: ClauseFormValues | null): void {
    this.cachedData = values;
  }
}
