import { Sentence, Tags, Type } from '../responses/vocabulary/word.model';

export interface AddWordBody {
  word: string;
  spanish: string;
  from: string;
  hiragana?: string;
  word_type?: Type;
  tags?: Tags;
  sentences?: Sentence[];
  notes?: string;
}
