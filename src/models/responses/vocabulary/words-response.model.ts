import { Word } from './word.model';

export interface WordsResponse {
  next_page_number: string;
  total_pages: number;
  total_words: number;
  words: Word[];
}
