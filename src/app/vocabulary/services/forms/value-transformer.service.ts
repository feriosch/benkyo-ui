import { Injectable } from '@angular/core';

import { AddWordBody } from 'src/models/requests/add-word-body.model';
import {
  Sentence,
  Tags,
  Type,
} from 'src/models/responses/vocabulary/word.model';

@Injectable({ providedIn: 'root' })
export class ValueTransformerService {
  transform(value: any, id?: string): AddWordBody {
    let spanish: string;
    let collection: string;
    let type: Type;

    if (value.hasOwnProperty('spanish')) spanish = <string>value.spanish;
    if (value.hasOwnProperty('collection'))
      collection = <string>value.collection;

    const addWordBody: AddWordBody = {
      spanish: spanish!,
      group: collection!,
    };

    if (id) {
      addWordBody.word_id = id;
    }

    if (value.hasOwnProperty('word')) {
      addWordBody.word = <string>value.word;
    }

    if (value.hasOwnProperty('type')) {
      type = {};
      if (value.type.hasOwnProperty('noun')) {
        if (value.type.noun) type.noun = value.type.noun;
      }
      if (value.type.hasOwnProperty('suru')) {
        if (value.type.suru) type.suru = value.type.suru;
      }
      if (value.type.hasOwnProperty('noAdj')) {
        if (value.type.noAdj) type.no_adj = value.type.noAdj;
      }
      if (value.type.hasOwnProperty('naAdj')) {
        if (value.type.naAdj) type.na_adj = value.type.naAdj;
      }
      if (value.type.hasOwnProperty('iAdj')) {
        if (value.type.iAdj) type.i_adj = value.type.iAdj;
      }
      if (value.type.hasOwnProperty('adv')) {
        if (value.type.adv) type.adv = value.type.adv;
      }
      if (value.type.hasOwnProperty('verb')) {
        if (value.type.verb) type.verb = value.type.verb;
      }
      if (value.type.hasOwnProperty('adjNoun')) {
        if (value.type.adjNoun)
          type.adj_noun = value.type.adjNoun;
      }
      if (value.type.hasOwnProperty('advNoun')) {
        if (value.type.advNoun)
          type.adv_noun = value.type.advNoun;
      }
      if (value.type.hasOwnProperty('counter')) {
        if (value.type.counter) type.counter = value.type.counter;
      }
      if (Object.keys(type).length > 0) addWordBody.word_type = type;
    }

    if (value.hasOwnProperty('hiragana')) {
      if (value.hiragana) addWordBody.hiragana = <string>value.hiragana;
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
        if (value.tags.onomatopoeic) tags.onomatopoeic = true;
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
          const sentence: Sentence = {
            sentence: japanese,
            translation: translation,
          };
          sentences.push(sentence);
        }
      });
      if (sentences.length > 0) addWordBody.sentences = sentences;
    }

    if (value.hasOwnProperty('notes')) {
      if (value.notes) addWordBody.notes = <string>value.notes;
    }

    return addWordBody;
  }
}
