import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { OrderDirection, OrderField } from '../../models/requests/vocabulary';
import { Word } from '../../models/responses/vocabulary/word.model';
import { WordsResponse } from '../../models/responses/vocabulary/words-response.model';
import { Collection } from '../../models/responses/vocabulary/collection.model';
import { AddWordBody } from '../../models/requests/add-word-body.model'


@Injectable({ providedIn: 'root' })
export class VocabularyService {
  private readonly wordsUrl: string;
  private readonly collectionsUrl: string;
  private readonly searchOneWordUrl: string;

  constructor(private http: HttpClient) {
    this.wordsUrl = `${environment.backendUrl}/words`;
    this.collectionsUrl = `${environment.backendUrl}/collections`;
    this.searchOneWordUrl = `${environment.backendUrl}/searchone`
  }

  getWords(
    collection?: string | null,
    pageSize?: number | null,
    pageNumber?: number | null,
    orderField?: OrderField | null,
    orderDirection?: OrderDirection | null
  ): Observable<WordsResponse> {
    let params = new HttpParams();
    if (collection) params = params.append('from', collection);
    if (pageSize) params = params.append('page_size', pageSize);
    if (pageNumber) params = params.append('page_number', pageNumber);
    if (orderField) params = params.append('order_field', orderField);
    if (orderDirection) params = params.append('order_direction', orderDirection);

    return this.http.get<WordsResponse>(this.wordsUrl, { params });
  }

  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.collectionsUrl);
  }

  searchWordByWord(word: string): Observable<Word | null> {
    let params = new HttpParams().append('word', word);
    return this.http.get<Word | null>(this.searchOneWordUrl, { params });
  }

  addNewWord(body: AddWordBody): Observable<any> {
    return this.http.post(this.wordsUrl, body);
  }

  getWordById(id: string): Observable<Word | null> {
    let params = new HttpParams().append('word_id', id);
    return this.http.get<Word | null>(this.searchOneWordUrl, { params });
  }
}
