import { Injectable } from '@angular/core';

import { AddWordBody } from '../../../models/requests/add-word-body.model';
import { Sentence, Tags, Type } from '../../../models/responses/vocabulary/word.model';

@Injectable({ providedIn: 'root' })
export class ValueTransformerService {

  transform(value: any, id?: string): AddWordBody {

    let spanish: string;
    let collection: string;
    let type: Type;

    if (value.hasOwnProperty('spanish')) spanish = <string> value.spanish;
    if (value.hasOwnProperty('collection')) collection = <string> value.collection;

    const addWordBody: AddWordBody = {
      spanish: spanish!,
      from: collection!
    }

    if (id) {
      addWordBody.word_id = id;
    }

    if (value.hasOwnProperty('word')) {
      addWordBody.word = <string> value.word;
    }

    if (value.hasOwnProperty('type')) {
      type = {};
      if(value.type.hasOwnProperty('noun')) {
        if (value.type.noun) type.noun = value.type.noun;
      }
      if(value.type.hasOwnProperty('suruVerb')) {
        if (value.type.suruVerb) type.suru_verb = value.type.suruVerb;
      }
      if(value.type.hasOwnProperty('noAdjective')) {
        if (value.type.noAdjective) type.no_adjective = value.type.noAdjective;
      }
      if(value.type.hasOwnProperty('naAdjective')) {
        if (value.type.naAdjective) type.na_adjective = value.type.naAdjective;
      }
      if(value.type.hasOwnProperty('iAdjective')) {
        if (value.type.iAdjective) type.i_adjective = value.type.iAdjective;
      }
      if(value.type.hasOwnProperty('adverb')) {
        if (value.type.adverb) type.adverb = value.type.adverb;
      }
      if(value.type.hasOwnProperty('verb')) {
        if (value.type.verb) type.verb = value.type.verb;
      }
      if(value.type.hasOwnProperty('adjectivalNoun')) {
        if (value.type.adjectivalNoun) type.adjectival_noun = value.type.adjectivalNoun;
      }
      if(value.type.hasOwnProperty('adverbialNoun')) {
        if (value.type.adverbialNoun) type.adverbial_noun = value.type.adverbialNoun;
      }
      if(value.type.hasOwnProperty('counter')) {
        if (value.type.counter) type.counter = value.type.counter;
      }
      if (Object.keys(type).length > 0) addWordBody.word_type = type;
    }

    if (value.hasOwnProperty('hiragana')) {
      if (value.hiragana) addWordBody.hiragana = <string> value.hiragana;
    }

    if (value.hasOwnProperty('tags')) {
      let tags: Tags = {};
      if (value.tags.hasOwnProperty('ateji')) {
        if (value.tags.ateji) tags.ateji = true;
      }
      if (value.tags.hasOwnProperty('common')) {
        if (value.tags.common) tags.common = true;
      }
      if (value.tags.hasOwnProperty('expression')) {
        if (value.tags.expression) tags.expression = true;
      }
      if (value.tags.hasOwnProperty('honorific')) {
        if (value.tags.honorific) tags.honorific = true;
      }
      if (value.tags.hasOwnProperty('humble')) {
        if (value.tags.humble) tags.humble = true;
      }
      if (value.tags.hasOwnProperty('intransitive')) {
        if (value.tags.intransitive) tags.intransitive = true;
      }
      if (value.tags.hasOwnProperty('jlptN1')) {
        if (value.tags.jlptN1) tags.jlpt_n1 = true;
      }
      if (value.tags.hasOwnProperty('notJoyo')) {
        if (value.tags.notJoyo) tags.joyogai = true;
      }
      if (value.tags.hasOwnProperty('onomatopoeic')) {
        if (value.tags.onomatopoeic) tags.onomatopeic = true;
      }
      if (value.tags.hasOwnProperty('transitive')) {
        if (value.tags.transitive) tags.transitive = true;
      }
      if (value.tags.hasOwnProperty('usuallyKana')) {
        if (value.tags.usuallyKana) tags.usually_kana = true;
      }
      if (Object.keys(tags).length > 0) addWordBody.tags = tags;
    }

    if (value.hasOwnProperty('sentences')) {
      let sentences: Sentence[] = [];
      value.sentences.forEach((sentenceValue: any) => {
        let japanese: string;
        let translation: string;
        if (sentenceValue.hasOwnProperty('japanese')) {
          if (sentenceValue.japanese) japanese = sentenceValue.japanese;
        }
        if (sentenceValue.hasOwnProperty('translation')) {
          if (sentenceValue.japanese) translation = sentenceValue.translation;
        }
        if (japanese! && translation!) {
          const sentence: Sentence = { sentence: japanese, translation: translation };
          sentences.push(sentence);
        }
      })
      if (sentences.length > 0) addWordBody.sentences = sentences;
    }

    if (value.hasOwnProperty('notes')) {
      if (value.notes) addWordBody.notes = <string> value.notes;
    }

    return addWordBody;
  }

}
