import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { OrderDirection, OrderField } from 'src/models/requests/vocabulary';
import { AddWordBody } from 'src/models/requests/add-word-body.model';
import { Word, NuanceTag } from 'src/models/responses/vocabulary/word.model';
import {
  DeletedResponse,
  WordsResponse,
} from 'src/models/responses/vocabulary/words-response.model';
import { CollectionsService } from 'src/app/collections/services/collections.service';

export interface AddRelatedWordBody {
  relatedWordId: string;
  type: 'related' | 'synonym' | 'antonym';
  tags?: NuanceTag[];
  note?: string;
}

export interface AddBasicRelatedWordBody {
  word: string;
  type: 'related' | 'synonym' | 'antonym';
  tags?: NuanceTag[];
  note?: string;
}

interface SearchResult {
  id: string;
  word: string;
  hiragana?: string;
  spanish: string;
}

@Injectable({ providedIn: 'root' })
export class VocabularyService {
  private readonly wordsUrl: string;
  private readonly searchOneWordUrl: string;

  constructor(
    private http: HttpClient,
    private collectionsService: CollectionsService,
  ) {
    this.wordsUrl = `${environment.backendUrl}/words`;
    this.searchOneWordUrl = `${this.wordsUrl}/search`;
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
    orderDirection?: OrderDirection | null,
  ): Observable<WordsResponse> {
    let params = new HttpParams();

    if (this.collectionsService.currentCollection)
      params = params.append(
        'group',
        this.collectionsService.currentCollection,
      );

    if (this.filter) params = params.append('filter_by', this.filter);
    if (this.pageSize) params = params.append('page_size', this.pageSize);
    if (this.pageNumber) params = params.append('page_number', this.pageNumber);
    if (orderField) params = params.append('order_field', orderField);
    if (orderDirection)
      params = params.append('order_direction', orderDirection);

    return this.http.get<WordsResponse>(this.wordsUrl, { params });
  }

  getWordById(id: string): Observable<Word | null> {
    let params = new HttpParams().append('word_id', id);
    return this.http.get<Word | null>(this.searchOneWordUrl, { params });
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

  deleteWord(id: string): Observable<DeletedResponse> {
    let params = new HttpParams().append('word_id', id);
    return this.http.delete<DeletedResponse>(this.wordsUrl, { params });
  }

  // Search words by query (for related words modal)
  searchWords(query: string): Observable<SearchResult[]> {
    let params = new HttpParams()
      .append('filter_by', query)
      .append('page_size', '15');
    return this.http.get<WordsResponse>(this.wordsUrl, { params }).pipe(
      map((response) =>
        response.words.map((w) => ({
          id: w.id,
          word: w.word,
          hiragana: w.hiragana,
          spanish: w.spanish,
        })),
      ),
    );
  }

  // Add a related word
  addRelatedWord(wordId: string, body: AddRelatedWordBody): Observable<any> {
    return this.http.post(`${this.wordsUrl}/${wordId}/related`, body);
  }

  // Remove a related word
  removeRelatedWord(wordId: string, relatedWordId: string): Observable<any> {
    return this.http.delete(
      `${this.wordsUrl}/${wordId}/related/${relatedWordId}`,
    );
  }

  addBasicRelatedWord(
    wordId: string,
    body: AddBasicRelatedWordBody,
  ): Observable<any> {
    return this.http.post(`${this.wordsUrl}/${wordId}/related/basic`, body);
  }

  removeBasicRelatedWord(wordId: string, word: string): Observable<any> {
    const params = new HttpParams().append('word', word);
    return this.http.delete(`${this.wordsUrl}/${wordId}/related/basic`, {
      params,
    });
  }
}
