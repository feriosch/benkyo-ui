import { FormArray, FormControl } from '@angular/forms';

export interface KanjiMainForm {
  v1: FormControl<number | null>;
  v2: FormControl<number | null>;
  kanji: FormControl<string | null>;
  on: FormControl<string | null>;
  kun: FormControl<string | null>;
  spanish: FormControl<string | null>;
  components: FormArray<FormControl<string | null>>;
  story: FormControl<string | null>;
}

export interface IrregularComponentForm {
  component: FormControl<string | null>;
  radicals: FormArray<FormControl<string | null>>;
}

export interface KanjiFormValues {
  v1: number | null;
  v2: number | null;
  on: string | null;
  kanji: string | null;
  kun: string | null;
  spanish: string | null;
  components: string[];
  story: string | null;
}
