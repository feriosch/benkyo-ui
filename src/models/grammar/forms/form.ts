import { Example, Formation, Related, Section, Tags, Type } from './controls';

import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface TypeForm {
  [key: string]: FormControl<boolean>;
}

export interface TagsForm {
  [key: string]: FormControl<boolean>;
}

export interface ExampleForm {
  sentence: FormControl<string | null>;
  translation: FormControl<string | null>;
}

export interface FormationForm {
  rule: FormControl<string | null>;
  examples: FormArray<FormGroup<ExampleForm>>;
}

export interface NoteForm {
  explanation: FormControl<string | null>;
  examples: FormArray<FormGroup<ExampleForm>>;
}

export interface RelatedSectionForm {
  explanation: FormControl<string | null>;
  examples: FormArray<FormGroup<ExampleForm>>;
}

export interface RelatedForm {
  title: FormControl<string | null>;
  hiragana: FormControl<string | null>;
  reference: FormControl<string | null>;
  sections: FormArray<FormGroup<RelatedSectionForm>>;
}

export interface MainForm {
  title: FormControl<string | null>;
  hiragana: FormControl<string | null>;
  translation: FormControl<string | null>;
  level: FormControl<string | null>;
  type: FormGroup<TypeForm>;
  tags: FormGroup<TagsForm>;
  definition: FormControl<string | null>;
  keys: FormArray<FormGroup<ExampleForm>>;
  formations: FormArray<FormGroup<FormationForm>>;
  examples: FormArray<FormGroup<ExampleForm>>;
  notes: FormArray<FormGroup<NoteForm>>;
  related: FormArray<FormGroup<RelatedForm>>;
}

export interface ClauseFormValues {
  title: string | null;
  hiragana: string | null;
  translation: string | null;
  level: string;
  type: Type;
  tags: Tags;
  definition: string | null;
  keys: Example[];
  formations: Formation[];
  examples: Example[];
  notes: Section[];
  related: Related[];
}
