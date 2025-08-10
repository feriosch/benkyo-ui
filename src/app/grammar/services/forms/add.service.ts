import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  Example,
  Formation,
  Related,
  Section,
} from 'src/models/grammar/forms/controls';
import {
  MainForm,
  ClauseFormValues,
  ExampleForm,
  NoteForm,
  FormationForm,
  RelatedForm,
  RelatedSectionForm,
} from 'src/models/grammar/forms/form';

@Injectable({ providedIn: 'root' })
export class AddFormService {
  _form?: FormGroup<MainForm>;
  addFormDataKey: string;

  constructor() {
    this.addFormDataKey = 'add_clause_form';
  }

  private get form(): FormGroup<MainForm> {
    return this._form!;
  }

  private set form(formGroup: FormGroup<MainForm>) {
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
        JSON.stringify(<ClauseFormValues>data),
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

  private getNewExampleFormGroup(example: Example): FormGroup<ExampleForm> {
    return new FormGroup<ExampleForm>({
      sentence: new FormControl<string | null>(example.sentence, [
        Validators.required,
      ]),
      translation: new FormControl<string | null>(example.translation, [
        Validators.required,
      ]),
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
    const keysArray: FormArray<FormGroup<ExampleForm>> = this.getFormArray(
      'keys',
    ) as FormArray<FormGroup<ExampleForm>>;
    this.cachedData!.keys.forEach((key: Example) => {
      keysArray.push(this.getNewExampleFormGroup(key));
    });
  }

  private initializeFormationControls(): void {
    const formationsArray: FormArray<FormGroup<FormationForm>> =
      this.getFormArray('formations') as FormArray<FormGroup<FormationForm>>;
    this.cachedData!.formations.forEach((formation: Formation) => {
      const formGroup: FormGroup<FormationForm> = new FormGroup<FormationForm>({
        rule: new FormControl<string | null>(formation.rule, [
          Validators.required,
        ]),
        examples: new FormArray<FormGroup<ExampleForm>>([]),
      });
      const examplesArray: FormArray<FormGroup<ExampleForm>> = formGroup.get(
        'examples',
      ) as FormArray<FormGroup<ExampleForm>>;
      formation.examples.forEach((example: Example) => {
        examplesArray.push(this.getNewExampleFormGroup(example));
      });
      formationsArray.push(formGroup);
    });
  }

  private initializeExampleControls(): void {
    const examplesArray: FormArray<FormGroup<ExampleForm>> = this.getFormArray(
      'examples',
    ) as FormArray<FormGroup<ExampleForm>>;
    this.cachedData!.examples!.forEach((example: Example) => {
      examplesArray.push(this.getNewExampleFormGroup(example));
    });
  }

  private initializeNoteControls(): void {
    this.cachedData!.notes.forEach((note: Section) => {
      const formGroup: FormGroup<NoteForm> = new FormGroup<NoteForm>({
        explanation: new FormControl<string | null>(note.explanation, [
          Validators.required,
        ]),
        examples: new FormArray<FormGroup<ExampleForm>>([]),
      });
      const examplesArray: FormArray<FormGroup<ExampleForm>> = formGroup.get(
        'examples',
      ) as FormArray<FormGroup<ExampleForm>>;
      note.examples!.forEach((example: Example) => {
        examplesArray!.push(this.getNewExampleFormGroup(example));
      });
      this.getFormArray('notes')!.push(formGroup);
    });
  }

  private initializeRelatedControls(): void {
    this.cachedData!.related!.forEach((related: Related) => {
      const formGroup: FormGroup<RelatedForm> = new FormGroup<RelatedForm>({
        title: new FormControl<string | null>(related.title, [
          Validators.required,
        ]),
        hiragana: new FormControl<string | null>(related.hiragana),
        reference: new FormControl<string | null>(related.reference),
        sections: new FormArray<FormGroup<RelatedSectionForm>>([]),
      });
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
        const examplesArray: FormArray<FormGroup<ExampleForm>> =
          sectionFormGroup.get('examples') as FormArray<FormGroup<ExampleForm>>;
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

  initializeForm(form: FormGroup<MainForm>): void {
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
