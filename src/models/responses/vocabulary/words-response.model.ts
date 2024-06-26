export interface SummarizedWord {
  id: string;
  word: string;
  hiragana?: string;
  spanish: string;
  from: string;
  tags?: string;
}

export interface WordsResponse {
  next_page_number: string;
  total_pages: number;
  total_words: number;
  words: SummarizedWord[];
}

export interface DeletedResponse {
  id: string;
}
