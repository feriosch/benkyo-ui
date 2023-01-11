import { Collection } from './collection.model';

export interface CollectionsResponse {
  collections: Collection[];
  next_page_number: string;
  total_pages: number;
  total_collections: number;
}
