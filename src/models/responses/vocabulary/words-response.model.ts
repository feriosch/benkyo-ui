import { Word } from './word.model';

export interface WordsResponse {
  next_page_number: string,
  words: Word[];
}
