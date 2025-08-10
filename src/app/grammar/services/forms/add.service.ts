import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { ClauseFormValues } from 'src/models/grammar/forms/form';
import {
  Example,
  Formation,
  Related,
  Section,
} from 'src/models/grammar/forms/controls';

@Injectable({ providedIn: 'root' })
export class AddFormService {
  _form?: UntypedFormGroup;
  addFormDataKey: string;

  constructor() {
    this.addFormDataKey = 'add_clause_form';
  }

  private get form(): UntypedFormGroup {
    return this._form!;
  }

  private set form(formGroup: UntypedFormGroup) {
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

  private getFormControl(control: string): UntypedFormControl {
    return this.form.get(control)! as UntypedFormControl;
  }

  private getFormGroup(group: string): UntypedFormGroup {
    return this.form.get(group)! as UntypedFormGroup;
  }

  private getFormArray(array: string): UntypedFormArray {
    return this.form.get(array)! as UntypedFormArray;
  }

  private getNewExampleFormGroup(example: Example): UntypedFormGroup {
    return new UntypedFormGroup({
      sentence: new UntypedFormControl(example.sentence, [Validators.required]),
      translation: new UntypedFormControl(example.translation, [Validators.required]),
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
    const keysArray: UntypedFormArray = this.getFormArray('keys');
    this.cachedData!.keys.forEach((key: Example) => {
      keysArray.push(this.getNewExampleFormGroup(key));
    });
  }

  private initializeFormationControls(): void {
    const formationsArray: UntypedFormArray = this.getFormArray('formations');
    this.cachedData!.formations.forEach((formation: Formation) => {
      const formGroup: UntypedFormGroup = new UntypedFormGroup({
        rule: new UntypedFormControl(formation.rule, [Validators.required]),
        examples: new UntypedFormArray([]),
      });
      const examplesArray: UntypedFormArray = formGroup.get('examples') as UntypedFormArray;
      formation.examples.forEach((example: Example) => {
        examplesArray.push(this.getNewExampleFormGroup(example));
      });
      formationsArray.push(formGroup);
    });
  }

  private initializeExampleControls(): void {
    const examplesArray: UntypedFormArray = this.getFormArray('examples');
    this.cachedData!.examples!.forEach((example: Example) => {
      examplesArray.push(this.getNewExampleFormGroup(example));
    });
  }

  private initializeNoteControls(): void {
    this.cachedData!.notes.forEach((note: Section) => {
      const formGroup: UntypedFormGroup = new UntypedFormGroup({
        explanation: new UntypedFormControl(note.explanation, [Validators.required]),
        examples: new UntypedFormArray([]),
      });
      const examplesArray: UntypedFormArray = formGroup.get('examples') as UntypedFormArray;
      note.examples!.forEach((example: Example) => {
        examplesArray!.push(this.getNewExampleFormGroup(example));
      });
      this.getFormArray('notes')!.push(formGroup);
    });
  }

  private initializeRelatedControls(): void {
    this.cachedData!.related!.forEach((related: Related) => {
      const formGroup: UntypedFormGroup = new UntypedFormGroup({
        title: new UntypedFormControl(related.title, [Validators.required]),
        hiragana: new UntypedFormControl(related.hiragana),
        reference: new UntypedFormControl(related.reference),
        sections: new UntypedFormArray([]),
      });
      const sectionsArray: UntypedFormArray = formGroup.get('sections') as UntypedFormArray;
      related.sections.forEach((section: Section) => {
        const sectionFormGroup: UntypedFormGroup = new UntypedFormGroup({
          explanation: new UntypedFormControl(section.explanation, [
            Validators.required,
          ]),
          examples: new UntypedFormArray([]),
        });
        const examplesArray: UntypedFormArray = sectionFormGroup.get(
          'examples'
        ) as UntypedFormArray;
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

  initializeForm(form: UntypedFormGroup): void {
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
