import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  pageSize: number | null;
  currentPageNumber: number | null;
  orderField: OrderField | null;
  orderDirection: OrderDirection | null;
  words$: Observable<Word[]>;
  collections$: Observable<Collection[]>;

  constructor(private vocabularyService: VocabularyService) {
    this.selectedCollection = null;
    this.pageSize = 10;
    this.currentPageNumber = null;
    this.orderField = null;
    this.orderDirection = null;
    this.words$ = new Observable<Word[]>();
    this.collections$ = new Observable<Collection[]>();
  }

  getWords(): void {
    this.words$ = this.vocabularyService.getWords(
      this.selectedCollection,
      this.pageSize,
      this.currentPageNumber,
      this.orderField,
      this.orderDirection
    )
      .pipe(map((response) => response.words))
  }

  getCollections(): void {
    this.collections$ = this.vocabularyService.getCollections();
  }

  changeCollection(collection: string): void {
    this.selectedCollection = collection;
    this.getWords();
  }

  ngOnInit(): void {
    this.getWords();
    this.getCollections();
  }

}
