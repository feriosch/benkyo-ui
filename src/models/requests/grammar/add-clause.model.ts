import {
  Example,
  Formation,
  Related,
  Section,
  Tags,
  Type,
} from 'src/models/responses/grammar/clause.model';

export interface AddClauseBody {
  clause_id?: string;
  title: string;
  hiragana?: string;
  translation: string;
  level: string;
  clause_type: Type;
  tags?: Tags;
  definition: string;
  keys: Example[];
  formations: Formation[];
  examples?: Example[];
  notes: Section[];
  related?: Related[];
}
