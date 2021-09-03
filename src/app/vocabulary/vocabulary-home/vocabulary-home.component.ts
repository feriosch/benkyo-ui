import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { VocabularyService } from '../vocabulary.service';
import { OrderDirection, OrderField } from '../../../models/requests/vocabulary';
import { Word } from '../../../models/responses/vocabulary/word.model';


@Component({
  selector: 'app-vocabulary-home',
  templateUrl: './vocabulary-home.component.html',
  styleUrls: ['./vocabulary-home.component.scss']
})
export class VocabularyHomeComponent implements OnInit {

  collection: string | null;
  pageSize: number | null;
  currentPageNumber: number | null;
  orderField: OrderField | null;
  orderDirection: OrderDirection | null;
  words$: Observable<Word[]>

  constructor(private vocabularyService: VocabularyService) {
    this.collection = null;
    this.pageSize = 12;
    this.currentPageNumber = null;
    this.orderField = null;
    this.orderDirection = null;
    this.words$ = new Observable<Word[]>();
  }

  getWords(): void {
    this.words$ = this.vocabularyService.getWords(
      this.collection,
      this.pageSize,
      this.currentPageNumber,
      this.orderField,
      this.orderDirection
    )
      .pipe(map((response) => response.words))
  }

  ngOnInit(): void {
    this.getWords();
  }

}
