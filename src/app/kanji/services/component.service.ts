import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { KanjiComponentsResponse } from 'src/models/kanji/components/responses.model';

@Injectable({ providedIn: 'root' })
export class KanjiComponentService {
  private readonly componentsUrl: string;
  private readonly pageSize: number;

  constructor(private http: HttpClient) {
    this.componentsUrl = `${environment.backendUrl}/kanjis/components`;
    this.pageSize = 5;
  }

  get pageNumber(): number | null {
    const page = localStorage.getItem('kanji_components_page');
    if (page) {
      return +page;
    } else {
      return null;
    }
  }

  set pageNumber(page: number | null) {
    if (page) {
      localStorage.setItem('kanji_components_page', page.toString());
    } else {
      localStorage.removeItem('kanji_components_page');
    }
  }

  get prefix(): string | null {
    return localStorage.getItem('kanji_components_prefix');
  }

  set prefix(prefix: string | null) {
    if (prefix) {
      localStorage.setItem('kanji_components_prefix', prefix);
    } else {
      localStorage.removeItem('kanji_components_prefix');
    }
  }

  getComponents(): Observable<KanjiComponentsResponse | null> {
    let params = new HttpParams();
    if (this.prefix) params = params.append('prefix', this.prefix);
    if (this.pageSize) params = params.append('page_size', this.pageSize);
    if (this.pageNumber) params = params.append('page_number', this.pageNumber);

    return this.http.get<KanjiComponentsResponse | null>(this.componentsUrl, {
      params,
    });
  }
}
