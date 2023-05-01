import { KanjiIrregularComponent } from './irregular.model';

export interface KanjiComponentsResponse {
  components: string[];
  next_page_number: number | null;
  total_pages: number;
  total_components: number;
}

export interface KanjiRadicalsResponse {
  radicals: string[];
  next_page_number: number | null;
  total_pages: number;
  total_components: number;
}

export interface KanjiIrregularComponentsResponse {
  components: KanjiIrregularComponent[];
}

export interface KanjiAddIrregularComponentResponse {
  id: string;
}
