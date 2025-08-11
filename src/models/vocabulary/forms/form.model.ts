import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface VocabularyTypeForm {
  noun: FormControl<number>;
  suru: FormControl<number>;
  noAdj: FormControl<number>;
  naAdj: FormControl<number>;
  iAdj: FormControl<number>;
  adv: FormControl<number>;
  verb: FormControl<number>;
  adjNoun: FormControl<number>;
  advNoun: FormControl<number>;
  counter: FormControl<number>;
}

export interface VocabularyTagsForm {
  ateji: FormControl<boolean>;
  common: FormControl<boolean>;
  expression: FormControl<boolean>;
  honorific: FormControl<boolean>;
  humble: FormControl<boolean>;
  intransitive: FormControl<boolean>;
  jlptN1: FormControl<boolean>;
  notJoyo: FormControl<boolean>;
  onomatopoeic: FormControl<boolean>;
  transitive: FormControl<boolean>;
  usuallyKana: FormControl<boolean>;
}

export interface VocabularySentenceForm {
  japanese: FormControl<string | null>;
  translation: FormControl<string | null>;
}

export interface VocabularyMainForm {
  word: FormControl<string | null>;
  hiragana: FormControl<string | null>;
  spanish: FormControl<string | null>;
  type: FormGroup<VocabularyTypeForm>;
  tags: FormGroup<VocabularyTagsForm>;
  notes: FormControl<string | null>;
  collection: FormControl<string | null>;
  sentences: FormArray<FormGroup<VocabularySentenceForm>>;
}

export interface VocabularyFormValues {
  word: string | null;
  hiragana: string | null;
  spanish: string | null;
  type: {
    noun: number;
    suru: number;
    noAdj: number;
    naAdj: number;
    iAdj: number;
    adv: number;
    verb: number;
    adjNoun: number;
    advNoun: number;
    counter: number;
  };
  tags: {
    ateji: boolean;
    common: boolean;
    expression: boolean;
    honorific: boolean;
    humble: boolean;
    intransitive: boolean;
    jlptN1: boolean;
    notJoyo: boolean;
    onomatopoeic: boolean;
    transitive: boolean;
    usuallyKana: boolean;
  };
  notes: string | null;
  collection: string | null;
  sentences: Array<{
    japanese: string | null;
    translation: string | null;
  }>;
}
