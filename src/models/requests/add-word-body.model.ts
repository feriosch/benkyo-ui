import { Sentence, Tags, Type } from '../responses/vocabulary/word.model';

export interface AddWordBody {
  word_id?: string;
  word?: string;
  spanish?: string;
  group?: string;
  hiragana?: string;
  word_type?: Type;
  tags?: Tags;
  sentences?: Sentence[];
  notes?: string;
}
