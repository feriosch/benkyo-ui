import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class WordTagsMapperService {

  getPrintingValueFromLocal(tag: string): string {
    switch (tag) {
      case 'ateji': return 'Ateji';
      case 'common': return 'Common';
      case 'expression': return 'Expression';
      case 'honorific': return 'Honorific';
      case 'humble': return 'Humble';
      case 'intransitive': return 'Intransitive';
      case 'jlptN1': return 'JLPT N1';
      case 'notJoyo': return 'Not Joyo';
      case 'onomatopoeic': return 'Onomatopoeic';
      case 'transitive': return 'Transitive';
      case 'usuallyKana': return 'Usually Kana';
      default: return '?';
    }
  }

  getPrintingValueFromBackend(tag: string): string {
    switch (tag) {
      case 'ateji': return 'Ateji';
      case 'common': return 'Common';
      case 'expression': return 'Expression';
      case 'honorific': return 'Honorific';
      case 'humble': return 'Humble';
      case 'intransitive': return 'Intransitive';
      case 'jlpt_n1': return 'JLPT N1';
      case 'joyogai': return 'Not Joyo';
      case 'onomatopeic': return 'Onomatopoeic';
      case 'transitive': return 'Transitive';
      case 'usually_kana': return 'Usually Kana';
      default: return '?';
    }
  }

}
