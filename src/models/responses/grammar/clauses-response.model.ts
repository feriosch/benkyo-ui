export interface SummarizedClause {
  id: string;
  title: string;
  hiragana?: string;
  translation: string;
  level: string;
}

export interface ClausesResponse {
  clauses: SummarizedClause[];
  next_page_number: string;
  total_pages: number;
  total_clauses: number;
}
