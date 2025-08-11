import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  KanjiMainForm,
  KanjiFormValues,
} from 'src/models/kanji/forms/form.model';

@Injectable({ providedIn: 'root' })
export class KanjiFormService {
  _form?: FormGroup<KanjiMainForm>;
  kanjiFormDataKey: string;

  constructor() {
    this.kanjiFormDataKey = 'kanji_form';
  }

  private get form(): FormGroup<KanjiMainForm> {
    return this._form!;
  }

  private set form(formGroup: FormGroup<KanjiMainForm>) {
    this._form = formGroup;
  }

  private get cachedData(): KanjiFormValues | null {
    const data = localStorage.getItem(this.kanjiFormDataKey);
    if (data) return <KanjiFormValues>JSON.parse(data);
    else return null;
  }

  private getFormControl(control: string): FormControl {
    return this.form.get(control)! as FormControl;
  }

  private getFormArray(array: string): FormArray {
    return this.form.get(array)! as FormArray;
  }

  private getNewComponentFormControl(
    component: string,
  ): FormControl<string | null> {
    return new FormControl<string | null>(component, [Validators.required]);
  }

  private initializeBasicControls(): void {
    this.getFormControl('v1').setValue(this.cachedData!.v1);
    this.getFormControl('v2').setValue(this.cachedData!.v2);
    this.getFormControl('on').setValue(this.cachedData!.on);
    this.getFormControl('kanji').setValue(this.cachedData!.kanji);
    this.getFormControl('kun').setValue(this.cachedData!.kun);
    this.getFormControl('spanish').setValue(this.cachedData!.spanish);
    this.getFormControl('story').setValue(this.cachedData!.story);
  }

  private initializeComponentControls(): void {
    const componentsArray: FormArray<FormControl<string | null>> =
      this.getFormArray('components') as FormArray<FormControl<string | null>>;

    this.cachedData!.components.forEach((component: string) => {
      componentsArray.push(this.getNewComponentFormControl(component));
    });
  }

  initializeForm(form: FormGroup<KanjiMainForm>): void {
    this.form = form;
    if (this.cachedData) {
      this.initializeBasicControls();
      this.initializeComponentControls();
    }
  }

  createNewForm(): FormGroup<KanjiMainForm> {
    return new FormGroup<KanjiMainForm>({
      v1: new FormControl<number | null>(null, [Validators.required]),
      v2: new FormControl<number | null>(null),
      on: new FormControl<string | null>(null),
      kanji: new FormControl<string | null>(null, [Validators.required]),
      kun: new FormControl<string | null>(null),
      spanish: new FormControl<string | null>(null, [Validators.required]),
      components: new FormArray<FormControl<string | null>>([]),
      story: new FormControl<string | null>(null),
    });
  }
}
