export interface Type {
  adjective: boolean;
  adverb: boolean;
  auxiliary: boolean;
  conjunction: boolean;
  modifier: boolean;
  noun: boolean;
  particle: boolean;
  phrase: boolean;
  structure: boolean;
  suffix: boolean;
}

export interface Tags {
  spoken: boolean;
  written: boolean;
  formal: boolean;
  colloquial: boolean;
  interrogative: boolean;
}

export interface Example {
  sentence: string | null;
  translation: string | null;
}

export interface Formation {
  rule: string | null;
  examples: Example[];
}

export interface Section {
  explanation: string | null;
  examples: Example[];
}

export interface Related {
  title: string | null;
  hiragana: string | null;
  reference: string | null;
  sections: Section[];
}
