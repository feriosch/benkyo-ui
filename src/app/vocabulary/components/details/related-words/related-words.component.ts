import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

import { RelatedWord } from 'src/models/responses/vocabulary/word.model';

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

  async onClickWord(wordId: string) {
    await this.router.navigate(['/vocabulary', 'word', wordId]);
  }
}
