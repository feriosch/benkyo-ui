import { Component, OnInit } from '@angular/core';

import { SummarizedWord } from 'src/models/responses/vocabulary/words-response.model';
import { Collection } from 'src/models/collections/collection.model';
import { CollectionsResponse } from 'src/models/collections/responses.model';
import { CollectionsService } from 'src/app/collections/services/collections.service';
import { VocabularyService } from '../../services/vocabulary.service';

@Component({
  selector: 'app-words-home-view',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class WordsHomeViewComponent implements OnInit {
  nextPageNumber: string;
  totalPages: number;
  totalWords: number;
  filter: string | null;
  words: SummarizedWord[];
  collections: Collection[];

  constructor(
    public collectionsService: CollectionsService,
    public vocabularyService: VocabularyService,
  ) {
    this.nextPageNumber = '';
    this.totalPages = 0;
    this.totalWords = 0;
    this.filter = this.vocabularyService.filter;
    this.words = [];
    this.collections = [];
  }

  getWords(): void {
    this.vocabularyService.getWords().subscribe(
      (response) => {
        this.words = response.words;
        this.nextPageNumber = response.next_page_number;
        this.totalPages = response.total_pages;
        this.totalWords = response.total_words;
      },
      (error) => console.log(error),
    );
  }

  getCollections(): void {
    this.collectionsService.getCollections().subscribe(
      (response: CollectionsResponse) => {
        this.collections = response.collections;
      },
      (error) => console.log(error),
    );
  }

  applyFilter(): void {
    if (this.filter) {
      this.vocabularyService.filter = this.filter;
      this.collectionsService.currentCollection = null;
      this.vocabularyService.pageNumber = 1;
      this.getWords();
    }
  }

  onChangeFilter(value: any) {
    if (!value) {
      this.vocabularyService.filter = null;
      this.vocabularyService.pageNumber = 1;
      this.getWords();
    }
  }

  changeCollection(collection: string | null): void {
    this.collectionsService.currentCollection = collection;
    this.vocabularyService.pageNumber = 1;
    this.getWords();
  }

  changeToFirstPage(): void {
    if (this.vocabularyService.pageNumber! > 1) {
      this.vocabularyService.pageNumber = 1;
    }
    this.getWords();
  }

  changeToPreviousPage(): void {
    if (this.vocabularyService.pageNumber! > 1) {
      this.vocabularyService.pageNumber =
        this.vocabularyService.pageNumber! - 1;
    }
    this.getWords();
  }

  changeToNextPage(): void {
    if (this.nextPageNumber) {
      this.vocabularyService.pageNumber = +this.nextPageNumber;
    }
    this.getWords();
  }

  changeToLastPage(): void {
    if (this.vocabularyService.pageNumber! < this.totalPages) {
      this.vocabularyService.pageNumber = this.totalPages;
    }
    this.getWords();
  }

  ngOnInit(): void {
    if (!this.vocabularyService.pageSize) {
      this.vocabularyService.pageSize = 10;
    }
    if (!this.vocabularyService.pageNumber) {
      this.vocabularyService.pageNumber = 1;
    }
    this.getWords();
    this.getCollections();
  }
}
