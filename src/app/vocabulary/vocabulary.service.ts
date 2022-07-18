import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderDirection, OrderField } from 'src/models/requests/vocabulary';
import { AddWordBody } from 'src/models/requests/add-word-body.model';
import { Word } from 'src/models/responses/vocabulary/word.model';
import { WordsResponse } from 'src/models/responses/vocabulary/words-response.model';
import { Collection } from 'src/models/responses/vocabulary/collection.model';

@Injectable({ providedIn: 'root' })
export class VocabularyService {
  private readonly wordsUrl: string;
  private readonly collectionsUrl: string;
  private readonly searchOneWordUrl: string;
  private readonly wordsCsvUrl: string;

  constructor(private http: HttpClient) {
    this.wordsUrl = `${environment.backendUrl}/words`;
    this.collectionsUrl = `${environment.backendUrl}/collections`;
    this.searchOneWordUrl = `${this.wordsUrl}/search`;
    this.wordsCsvUrl = `${this.wordsUrl}/csv`;
  }

  get currentCollection(): string | null {
    return localStorage.getItem('collection');
  }

  set currentCollection(collection: string | null) {
    if (collection) {
      localStorage.setItem('collection', collection);
    } else {
      localStorage.removeItem('collection');
    }
  }

  get pageSize(): number | null {
    const page = localStorage.getItem('page_size');
    if (page) {
      return +page;
    } else {
      return null;
    }
  }

  set pageSize(page: number | null) {
    if (page) {
      localStorage.setItem('page_size', page.toString());
    } else {
      localStorage.removeItem('page_size');
    }
  }

  get pageNumber(): number | null {
    const page = localStorage.getItem('page');
    if (page) {
      return +page;
    } else {
      return null;
    }
  }

  set pageNumber(page: number | null) {
    if (page) {
      localStorage.setItem('page', page.toString());
    } else {
      localStorage.removeItem('page');
    }
  }

  get filter(): string | null {
    return localStorage.getItem('filter');
  }

  set filter(filter: string | null) {
    if (filter) {
      localStorage.setItem('filter', filter);
    } else {
      localStorage.removeItem('filter');
    }
  }

  getWords(
    orderField?: OrderField | null,
    orderDirection?: OrderDirection | null
  ): Observable<WordsResponse> {
    let params = new HttpParams();
    if (this.currentCollection)
      params = params.append('from', this.currentCollection);
    if (this.filter) params = params.append('filter_by', this.filter);
    if (this.pageSize) params = params.append('page_size', this.pageSize);
    if (this.pageNumber) params = params.append('page_number', this.pageNumber);
    if (orderField) params = params.append('order_field', orderField);
    if (orderDirection)
      params = params.append('order_direction', orderDirection);

    return this.http.get<WordsResponse>(this.wordsUrl, { params });
  }

  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.collectionsUrl);
  }

  getCollection(name: string): Observable<Collection> {
    let params = new HttpParams();
    params = params.append('name', name);

    return this.http.get<Collection>(this.collectionsUrl, { params });
  }

  searchWordByWord(word: string): Observable<Word | null> {
    let params = new HttpParams().append('word', word);
    return this.http.get<Word | null>(this.searchOneWordUrl, { params });
  }

  addNewWord(body: AddWordBody): Observable<any> {
    return this.http.post(this.wordsUrl, body);
  }

  updateWord(body: AddWordBody): Observable<any> {
    return this.http.put(this.wordsUrl, body);
  }

  getWordById(id: string): Observable<Word | null> {
    let params = new HttpParams().append('word_id', id);
    return this.http.get<Word | null>(this.searchOneWordUrl, { params });
  }

  downloadCSVFile() {
    let params = new HttpParams();
    if (this.currentCollection)
      params = params.append('from', this.currentCollection);
    return this.http.get(this.wordsCsvUrl, { params, responseType: 'blob' });
  }
}
