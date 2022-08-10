import { Example, Formation, Related, Section, Tags, Type } from './controls';

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
