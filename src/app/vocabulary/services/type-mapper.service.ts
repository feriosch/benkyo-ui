import { Injectable } from '@angular/core';

import { FromBackendTypeMap } from 'src/models/vocabulary/type';

@Injectable({ providedIn: 'root' })
export class TypeMapperService {
  constructor() {}

  get frontendSubtypes(): FromBackendTypeMap {
    return {
      noun: 'noun',
      suru: 'suru',
      no_adj: 'noAdj',
      na_adj: 'naAdj',
      i_adj: 'iAdj',
      adv: 'adverb',
      verb: 'verb',
      adj_noun: 'adjNoun',
      adv_noun: 'advNoun',
      counter: 'counter',
    };
  }

  get backendSubtypes(): string[] {
    return [
      'noun',
      'suru',
      'no_adj',
      'na_adj',
      'i_adj',
      'adv',
      'verb',
      'adj_noun',
      'adv_noun',
      'counter',
    ];
  }

  getPrintingValueFromLocal(subType: string): string {
    switch (subType) {
      case 'noun':
        return '名';
      case 'suru':
        return 'する';
      case 'noAdj':
        return 'の形';
      case 'naAdj':
        return 'な形';
      case 'iAdj':
        return 'い形';
      case 'adv':
        return '副';
      case 'verb':
        return '動';
      case 'adjNoun':
        return '名形';
      case 'advNoun':
        return '副名';
      case 'counter':
        return '回';
      default:
        return '?';
    }
  }

  getPrintingValueFromBackend(subType: string): string {
    switch (subType) {
      case 'noun':
        return '名';
      case 'suru':
        return 'する';
      case 'no_adj':
        return 'の形';
      case 'na_adj':
        return 'な形';
      case 'i_adj':
        return 'い形';
      case 'adv':
        return '副';
      case 'verb':
        return '動';
      case 'adj_noun':
        return '名形';
      case 'adv_noun':
        return '副名';
      case 'counter':
        return '回';
      default:
        return '?';
    }
  }

  getValueText(value: number, defaultName: string): string {
    switch (value) {
      case 0:
      case 1:
      case 2:
        return defaultName;
      case 3:
        return 'に';
      case 4:
        return 'と';
      case 5:
        return '的';
      case 6:
        return '的に';
      case 7:
        return 'たる';
      case 8:
        return 'を';
      default:
        return defaultName;
    }
  }
}
