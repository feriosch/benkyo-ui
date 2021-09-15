import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { VocabularyService } from '../vocabulary.service';
import { OrderDirection, OrderField } from '../../../models/requests/vocabulary';
import { Word } from '../../../models/responses/vocabulary/word.model';
import { Collection } from '../../../models/responses/vocabulary/collection.model'


@Component({
  selector: 'app-vocabulary-home',
  templateUrl: './vocabulary-home.component.html',
  styleUrls: ['./vocabulary-home.component.scss']
})
export class VocabularyHomeComponent implements OnInit {

  selectedCollection: string | null;
  pageSize: number;
  currentPageNumber: number;
  nextPageNumber: string;
  totalPages: number;
  totalWords: number;
  orderField: OrderField | null;
  orderDirection: OrderDirection | null;
  isWordFetchLoading: boolean;
  words: Word[];
  collections$: Observable<Collection[]>;

  constructor(private vocabularyService: VocabularyService) {
    this.selectedCollection = null;
    this.pageSize = 10;
    this.currentPageNumber = 1;
    this.nextPageNumber = '';
    this.totalPages = 0;
    this.totalWords = 0;
    this.orderField = null;
    this.orderDirection = null;
    this.isWordFetchLoading = false;
    this.words = [];
    this.collections$ = new Observable<Collection[]>();
  }

  getWords(): void {
    this.isWordFetchLoading = true;
    this.vocabularyService.getWords(
      this.selectedCollection,
      this.pageSize,
      this.currentPageNumber,
      this.orderField,
      this.orderDirection
    ).toPromise()
      .then((response) => {
        this.words = response.words;
        this.nextPageNumber = response.next_page_number;
        this.totalPages = response.total_pages;
        this.totalWords = response.total_words;
      })
      .catch((error) => console.log(error))
      .finally(() => this.isWordFetchLoading = false);
  }

  getCollections(): void {
    this.collections$ = this.vocabularyService.getCollections();
  }

  changeCollection(collection: string | null): void {
    this.selectedCollection = collection;
    this.currentPageNumber = 1;
    this.getWords();
  }

  changeToFirstPage(): void {
    if (this.currentPageNumber > 1) {
      this.currentPageNumber = 1;
      this.getWords();
    }
  }

  changeToPreviousPage(): void {
    if (this.currentPageNumber > 1) this.currentPageNumber--;
    this.getWords();
  }

  changeToNextPage(): void {
    if (this.nextPageNumber) this.currentPageNumber = +this.nextPageNumber;
    this.getWords();
  }

  changeToLastPage(): void {
    if (this.currentPageNumber < this.totalPages) this.currentPageNumber = this.totalPages;
    this.getWords();
  }

  ngOnInit(): void {
    this.getWords();
    this.getCollections();
  }

}
