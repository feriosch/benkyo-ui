import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { KanjiComponentsResponse } from 'src/models/kanji/components/responses.model';
import { CompactedKanjiResponse } from 'src/models/kanji/responses.model';

@Injectable({ providedIn: 'root' })
export class KanjiComponentService {
  private readonly kanjisUrl: string;
  private readonly componentsUrl: string;
  private readonly pageSize: number;

  constructor(private http: HttpClient) {
    this.kanjisUrl = `${environment.backendUrl}/kanjis`;
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

  getCompactKanjisByComponents(
    components: string[],
    pageSize: number,
    pageNumber: number
  ): Observable<CompactedKanjiResponse> {
    let params = new HttpParams();

    components.forEach((component: string, index: number) => {
      let parameter = 'c' + (index + 1);
      params = params.append(parameter, component);
    });

    params = params.append('page_size', pageSize);
    params = params.append('page_number', pageNumber);
    params = params.append('compact', true);

    return this.http.get<CompactedKanjiResponse>(this.kanjisUrl, { params });
  }
}
