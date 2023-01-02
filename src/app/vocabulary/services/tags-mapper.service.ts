import { Injectable } from '@angular/core';

import { FromBackendTagsMap } from 'src/models/vocabulary/tags';

@Injectable({ providedIn: 'root' })
export class TagsMapperService {
  get frontendTags(): FromBackendTagsMap {
    return {
      ateji: 'ateji',
      common: 'common',
      expression: 'expression',
      honorific: 'honorific',
      humble: 'humble',
      intransitive: 'intransitive',
      jlpt_n1: 'jlptN1',
      joyogai: 'notJoyo',
      onomatopeic: 'onomatopoeic',
      transitive: 'transitive',
      usually_kana: 'usuallyKana',
    };
  }

  getPrintingValueFromLocal(tag: string): string {
    switch (tag) {
      case 'ateji':
        return 'Ateji';
      case 'common':
        return 'Common';
      case 'expression':
        return 'Expression';
      case 'honorific':
        return 'Honorific';
      case 'humble':
        return 'Humble';
      case 'intransitive':
        return 'Intransitive';
      case 'jlptN1':
        return 'JLPT N1';
      case 'notJoyo':
        return 'Not Joyo';
      case 'onomatopoeic':
        return 'Onomatopoeic';
      case 'transitive':
        return 'Transitive';
      case 'usuallyKana':
        return 'Usually Kana';
      default:
        return '?';
    }
  }

  getPrintingValueFromBackend(tag: string): string {
    switch (tag) {
      case 'ateji':
        return 'Ateji';
      case 'common':
        return 'Common';
      case 'expression':
        return 'Expression';
      case 'honorific':
        return 'Honorific';
      case 'humble':
        return 'Humble';
      case 'intransitive':
        return 'Intransitive';
      case 'jlpt_n1':
        return 'JLPT N1';
      case 'joyogai':
        return 'Not Joyo';
      case 'onomatopeic':
        return 'Onomatopoeic';
      case 'transitive':
        return 'Transitive';
      case 'usually_kana':
        return 'Usually Kana';
      default:
        return '?';
    }
  }
}
