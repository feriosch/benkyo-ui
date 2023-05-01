export interface KanjiIrregularComponent {
  id: string;
  component: string;
  radicals: string[];
}

export interface KanjiAddIrregularComponentBody {
  component: string;
  radicals: string[];
}
