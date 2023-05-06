export interface UpdateRequest {
  kanji_id: string;
  v1: number;
  kanji: string;
  spanish: string;
  v2?: number;
  on?: string;
  kun?: string;
  components?: string[];
  story?: string;
}
