export interface FullKanji {
  id: string;
  v1: number;
  v2: number | null;
  kanji: string;
  on: string | null;
  kun: string | null;
  spanish: string;
  components: string[] | null;
  radicals: string[];
  story: string | null;
  recursive: boolean;
}

export interface CompactedKanji {
  id: string;
  kanji: string;
}
