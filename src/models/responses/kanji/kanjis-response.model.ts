import { SummarizedKanji } from './kanji.model';

export interface KanjisResponse {
  next_page_number: string,
  total_pages: number,
  total_kanjis: number,
  kanjis: SummarizedKanji[];
}
