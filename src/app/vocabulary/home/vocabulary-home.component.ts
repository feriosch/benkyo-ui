import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderDirection, OrderField } from 'src/models/requests/vocabulary';
import { SummarizedWord } from 'src/models/responses/vocabulary/words-response.model';
import { Collection } from 'src/models/responses/vocabulary/collection.model';
import { VocabularyService } from '../vocabulary.service';

@Component({
  selector: 'app-vocabulary-home',
  templateUrl: './vocabulary-home.component.html',
  styleUrls: ['./vocabulary-home.component.scss'],
})
export class VocabularyHomeComponent implements OnInit {
  nextPageNumber: string;
  totalPages: number;
  totalWords: number;
  filter: string | null;
  orderField: OrderField | null;
  orderDirection: OrderDirection | null;
  isWordFetchLoading: boolean;
  words: SummarizedWord[];
  collections$: Observable<Collection[]>;

  constructor(public vocabularyService: VocabularyService) {
    this.nextPageNumber = '';
    this.totalPages = 0;
    this.totalWords = 0;
    this.filter = this.vocabularyService.filter;
    this.orderField = null;
    this.orderDirection = null;
    this.isWordFetchLoading = false;
    this.words = [];
    this.collections$ = new Observable<Collection[]>();
  }

  getWords(): void {
    this.isWordFetchLoading = true;
    this.vocabularyService
      .getWords(this.orderField, this.orderDirection)
      .toPromise()
      .then((response) => {
        this.words = response.words;
        this.nextPageNumber = response.next_page_number;
        this.totalPages = response.total_pages;
        this.totalWords = response.total_words;
      })
      .catch((error) => console.log(error))
      .finally(() => (this.isWordFetchLoading = false));
  }

  getCollections(): void {
    this.collections$ = this.vocabularyService.getCollections();
  }

  applyFilter(): void {
    if (this.filter) {
      this.vocabularyService.filter = this.filter;
      this.vocabularyService.currentCollection = null;
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
    this.vocabularyService.currentCollection = collection;
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
