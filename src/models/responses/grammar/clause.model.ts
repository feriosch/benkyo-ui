export interface Type {
  adjective?: boolean;
  adverb?: boolean;
  auxiliary?: boolean;
  conjunction?: boolean;
  modifier?: boolean;
  noun?: boolean;
  particle?: boolean;
  phrase?: boolean;
  structure?: boolean;
  suffix?: boolean;
}

export interface Tags {
  spoken?: boolean;
  written?: boolean;
  formal?: boolean;
  colloquial?: boolean;
  interrogative?: boolean;
}

export interface Example {
  sentence: string;
  translation: string;
}

export interface Formation {
  rule: string;
  examples: Example[];
}

export interface Section {
  explanation: string;
  examples?: Example[];
}

export interface Related {
  title: string;
  hiragana?: string;
  reference?: string;
  sections: Section[]
}

export interface FullClause {
  id: string;
  title: string;
  hiragana?: string;
  translation: string;
  level: string;
  type: Type;
  tags?: Tags;
  definition: string;
  keys: Example[];
  formations: Formation[];
  examples?: Example[];
  notes: Section[];
  related?: Related[];
}
