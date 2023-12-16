export interface Word {
  id: string;
  word: string;
  hiragana?: string;
  spanish: string;
  group: string;
  notes?: string;
  type: Type;
  tags?: string[];
  sentences?: Sentence[];
}

export interface Type {
  noun?: number;
  suru?: number;
  no_adj?: number;
  na_adj?: number;
  i_adj?: number;
  adv?: number;
  verb?: number;
  adj_noun?: number;
  adv_noun?: number;
  counter?: number;
}

export interface Sentence {
  sentence: string;
  translation: string;
}
