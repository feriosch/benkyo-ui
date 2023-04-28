import { CompactedKanji } from './kanji.model';

export interface CompactedKanjiResponse {
  kanjis: CompactedKanji[];
  next_page_number: string;
  total_pages: number;
  total_kanjis: number;
}
