import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class WordTypeMapperService {

  constructor () { }

  get backendSubtypes(): string[] {
    return [
      'noun',
      'suru_verb',
      'no_adjective',
      'na_adjective',
      'i_adjective',
      'adverb',
      'verb',
      'adjectival_noun',
      'adverbial_noun',
      'counter'
    ]
  }

  getPrintingValueFromLocal(subType: string): string {
    switch (subType) {
      case 'noun': return '名';
      case 'suruVerb': return 'する';
      case 'noAdjective': return 'の形';
      case 'naAdjective': return 'な形';
      case 'iAdjective': return 'い形';
      case 'adverb': return '副';
      case 'verb': return '動';
      case 'adjectivalNoun': return '名形';
      case 'adverbialNoun': return '副名';
      case 'counter': return '回';
      default: return '?';
    }
  }

  getPrintingValueFromBackend(subType: string): string {
    switch (subType) {
      case 'noun': return '名';
      case 'suru_verb': return 'する';
      case 'no_adjective': return 'の形';
      case 'na_adjective': return 'な形';
      case 'i_adjective': return 'い形';
      case 'adverb': return '副';
      case 'verb': return '動';
      case 'adjectival_noun': return '名形';
      case 'adverbial_noun': return '副名';
      case 'counter': return '回';
      default: return '?';
    }
  }

  getValueText(value: number, defaultName: string): string {
    switch (value) {
      case 0:
      case 1:
      case 2: return defaultName;
      case 3: return 'に';
      case 4: return 'と';
      case 5: return '的';
      case 6: return '的に';
      case 7: return 'たる';
      case 8: return 'を';
      default: return defaultName;
    }
  }

}
