import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Kanji } from '../../models/responses/kanji/kanji.model';
import { OrderDirection, OrderField } from '../../models/requests/kanji';
import { KanjisResponse } from '../../models/responses/kanji/kanjis-response.model';


@Injectable({ providedIn: 'root' })
export class KanjiService {
  private readonly kanjisUrl: string;
  private readonly searchOneKanjiUrl: string;

  constructor(private http: HttpClient) {
    this.kanjisUrl = `${environment.backendUrl}/kanjis`;
    this.searchOneKanjiUrl = `${environment.backendUrl}/kanjis/searchone`;
  }

  get pageSize(): number | null {
    const page = localStorage.getItem('kanji_page_size');
    if (page) {
      return +page;
    } else {
      return null;
    }
  }

  set pageSize(page: number | null) {
    if (page) {
      localStorage.setItem('kanji_page_size', page.toString());
    } else {
      localStorage.removeItem('kanji_page_size');
    }
  }

  get pageNumber(): number | null {
    const page = localStorage.getItem('kanji_page');
    if (page) {
      return +page;
    } else {
      return null;
    }
  }

  set pageNumber(page: number | null) {
    if (page) {
      localStorage.setItem('kanji_page', page.toString());
    } else {
      localStorage.removeItem('kanji_page');
    }
  }

  get filter(): string | null {
    return localStorage.getItem('kanji_filter');
  }

  set filter(filter: string | null) {
    if (filter) {
      localStorage.setItem('kanji_filter', filter);
    } else {
      localStorage.removeItem('kanji_filter');
    }
  }

  getKanjis(
    orderField?: OrderField | null,
    orderDirection?: OrderDirection | null
  ): Observable<KanjisResponse> {
    let params = new HttpParams();
    if (this.filter) params = params.append('filter_by', this.filter);
    if (this.pageSize) params = params.append('page_size', this.pageSize);
    if (this.pageNumber) params = params.append('page_number', this.pageNumber);
    if (orderField) params = params.append('order_field', orderField);
    if (orderDirection) params = params.append('order_direction', orderDirection);

    return this.http.get<KanjisResponse>(this.kanjisUrl, { params })
  }

  getKanjiByKanji(kanji: string): Observable<Kanji | null> {
    let params = new HttpParams().append('kanji', kanji);
    return this.http.get<Kanji | null>(this.searchOneKanjiUrl, { params });
  }
}
