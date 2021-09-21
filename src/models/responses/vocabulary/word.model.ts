export interface Word {
  id: string;
  word: string;
  hiragana?: string;
  spanish: string;
  from: string;
  level: number;
  notes?: string;
  type: Type;
  tags?: Tags;
  sentences?: Sentence[]
}

export interface Type {
  noun?: number;
  suru_verb?: number;
  no_adjective?: number;
  na_adjective?: number;
  i_adjective?: number;
  adverb?: number;
  verb?: number;
  adjectival_noun?: number;
  adverbial_noun?: number;
  counter?: number;
}

export interface Tags {
  ateji?: boolean;
  common?: boolean;
  expression?: boolean;
  honorific?: boolean;
  humble?: boolean;
  intransitive?: boolean;
  jlpt_n1?: boolean;
  joyogai?: boolean;
  onomatopeic?: boolean;
  transitive?: boolean;
  usually_kana?: boolean;
}

export interface Sentence {
  sentence: string;
  translation: string;
}
