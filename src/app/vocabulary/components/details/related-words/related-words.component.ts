import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import {
  RelatedWord,
  NuanceTag,
} from 'src/models/responses/vocabulary/word.model';
import { VocabularyService } from '../../../services/vocabulary.service';

interface SearchResult {
  id: string;
  word: string;
  hiragana?: string;
  spanish: string;
}

@Component({
  selector: 'app-word-details-related-words',
  templateUrl: './related-words.component.html',
  styleUrls: ['./related-words.component.scss'],
  imports: [NgClass, FormsModule],
})
export class WordDetailsRelatedWordsComponent {
  @Input() related!: RelatedWord[];
  @Input() wordId!: string;
  @Output() relationshipAdded = new EventEmitter<void>();
  @Output() relationshipRemoved = new EventEmitter<string>();

  // Add Modal state
  showAddModal = false;
  searchQuery = '';
  searchResults: SearchResult[] = [];
  selectedWord: SearchResult | null = null;
  selectedType: 'related' | 'synonym' | 'antonym' = 'related';
  selectedNuanceTags: NuanceTag[] = [];
  selectedNote = '';
  isSearching = false;
  isSaving = false;

  // Add Basic Modal state
  showBasicModal = false;
  basicWordText = '';
  basicType: 'related' | 'synonym' | 'antonym' = 'related';
  basicNuanceTags: NuanceTag[] = [];
  basicNote = '';
  isSavingBasic = false;

  // Remove Modal state
  showRemoveModal = false;
  wordToRemove: RelatedWord | null = null;
  isRemoving = false;

  availableNuanceTags: NuanceTag[] = [
    'formal',
    'casual',
    'spoken',
    'written',
    'literary',
    'technical',
    'polite',
    'humble',
    'archaic',
  ];

  private searchSubject = new Subject<string>();

  constructor(
    private router: Router,
    private vocabularyService: VocabularyService,
  ) {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.performSearch(query);
      });
  }

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

  onClickAdd() {
    this.showAddModal = true;
    this.resetModal();
  }

  closeAddModal() {
    this.showAddModal = false;
    this.resetModal();
  }

  resetModal() {
    this.searchQuery = '';
    this.searchResults = [];
    this.selectedWord = null;
    this.selectedType = 'related';
    this.selectedNuanceTags = [];
    this.selectedNote = '';
  }

  onSearchInput() {
    if (this.searchQuery.length >= 1) {
      this.searchSubject.next(this.searchQuery);
    } else {
      this.searchResults = [];
    }
  }

  performSearch(query: string) {
    if (!query) return;

    this.isSearching = true;
    this.vocabularyService.searchWords(query).subscribe({
      next: (results) => {
        // Filter out already related words and the current word
        const existingIds = new Set([
          this.wordId,
          ...this.related.map((r) => r.wordId),
        ]);
        this.searchResults = results
          .filter((w) => !existingIds.has(w.id))
          .slice(0, 10);
        this.isSearching = false;
      },
      error: () => {
        this.isSearching = false;
        this.searchResults = [];
      },
    });
  }

  selectWord(word: SearchResult) {
    this.selectedWord = word;
  }

  toggleNuanceTag(tag: NuanceTag) {
    const index = this.selectedNuanceTags.indexOf(tag);
    if (index > -1) {
      this.selectedNuanceTags.splice(index, 1);
    } else {
      this.selectedNuanceTags.push(tag);
    }
  }

  saveRelatedWord() {
    if (!this.selectedWord) return;

    this.isSaving = true;
    this.vocabularyService
      .addRelatedWord(this.wordId, {
        relatedWordId: this.selectedWord.id,
        type: this.selectedType,
        tags:
          this.selectedNuanceTags.length > 0
            ? this.selectedNuanceTags
            : undefined,
        note: this.selectedNote || undefined,
      })
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.closeAddModal();
          this.relationshipAdded.emit();
        },
        error: () => {
          this.isSaving = false;
          // Could show error toast here
        },
      });
  }

  // Basic word modal methods
  onClickAddBasic() {
    this.showBasicModal = true;
    this.resetBasicModal();
  }

  closeBasicModal() {
    this.showBasicModal = false;
    this.resetBasicModal();
  }

  resetBasicModal() {
    this.basicWordText = '';
    this.basicType = 'related';
    this.basicNuanceTags = [];
    this.basicNote = '';
  }

  toggleBasicNuanceTag(tag: NuanceTag) {
    const index = this.basicNuanceTags.indexOf(tag);
    if (index > -1) {
      this.basicNuanceTags.splice(index, 1);
    } else {
      this.basicNuanceTags.push(tag);
    }
  }

  saveBasicWord() {
    if (!this.basicWordText.trim()) return;

    this.isSavingBasic = true;
    this.vocabularyService
      .addBasicRelatedWord(this.wordId, {
        word: this.basicWordText.trim(),
        type: this.basicType,
        tags:
          this.basicNuanceTags.length > 0 ? this.basicNuanceTags : undefined,
        note: this.basicNote || undefined,
      })
      .subscribe({
        next: () => {
          this.isSavingBasic = false;
          this.closeBasicModal();
          this.relationshipAdded.emit();
        },
        error: () => {
          this.isSavingBasic = false;
        },
      });
  }

  onClickRemove(event: Event, rel: RelatedWord) {
    event.stopPropagation();
    this.wordToRemove = rel;
    this.showRemoveModal = true;
  }

  closeRemoveModal() {
    this.showRemoveModal = false;
    this.wordToRemove = null;
  }

  confirmRemove() {
    if (!this.wordToRemove) return;

    this.isRemoving = true;
    const remove$ = this.wordToRemove.isBasic
      ? this.vocabularyService.removeBasicRelatedWord(
          this.wordId,
          this.wordToRemove.word!,
        )
      : this.vocabularyService.removeRelatedWord(
          this.wordId,
          this.wordToRemove.wordId!,
        );

    remove$.subscribe({
      next: () => {
        this.isRemoving = false;
        this.closeRemoveModal();
        this.relationshipRemoved.emit(this.wordToRemove!.wordId);
      },
      error: () => {
        this.isRemoving = false;
      },
    });
  }
}
