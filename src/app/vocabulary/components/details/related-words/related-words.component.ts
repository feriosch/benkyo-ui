import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

import {
  RelatedWord,
  NuanceTag,
} from 'src/models/responses/vocabulary/word.model';

@Component({
  selector: 'app-word-details-related-words',
  templateUrl: './related-words.component.html',
  styleUrls: ['./related-words.component.scss'],
  imports: [NgClass],
})
export class WordDetailsRelatedWordsComponent {
  @Input()
  related!: RelatedWord[];

  constructor(private router: Router) {}

  getTypeLabel(type: string): string {
    switch (type) {
      case 'synonym':
        return 'Synonym';
      case 'antonym':
        return 'Antonym';
      default:
        return 'Related';
    }
  }

  getTypeClass(type: string): string {
    switch (type) {
      case 'synonym':
        return 'is-success';
      case 'antonym':
        return 'is-danger';
      default:
        return 'is-info';
    }
  }

  getNuanceLabel(nuance: NuanceTag): string {
    const labels: Record<NuanceTag, string> = {
      formal: '敬',
      casual: '俗',
      spoken: '口',
      written: '文',
      literary: '雅',
      technical: '専',
      polite: '丁',
      humble: '謙',
      archaic: '古',
    };
    return labels[nuance] || nuance;
  }

  getNuanceClass(nuance: NuanceTag): string {
    const classes: Record<NuanceTag, string> = {
      formal: 'nuance-formal',
      casual: 'nuance-casual',
      spoken: 'nuance-spoken',
      written: 'nuance-written',
      literary: 'nuance-literary',
      technical: 'nuance-technical',
      polite: 'nuance-polite',
      humble: 'nuance-humble',
      archaic: 'nuance-archaic',
    };
    return classes[nuance] || '';
  }

  async onClickWord(wordId: string) {
    await this.router.navigate(['/vocabulary', 'word', wordId]);
  }
}
