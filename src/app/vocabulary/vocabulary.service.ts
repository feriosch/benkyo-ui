import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { OrderDirection, OrderField } from '../../models/requests/vocabulary';
import { WordsResponse } from '../../models/responses/vocabulary/words-response.model';


@Injectable({ providedIn: 'root' })
export class VocabularyService {
  readonly wordsUrl: string;

  constructor(private http: HttpClient) {
    this.wordsUrl = `${environment.backendUrl}/words`;
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
}
