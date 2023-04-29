import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { KanjiRadicalsResponse } from 'src/models/kanji/components/responses.model';
import { CompactedKanjiResponse } from 'src/models/kanji/responses.model';

@Injectable({ providedIn: 'root' })
export class KanjiRadicalService {
  private readonly kanjisUrl: string;
  private readonly radicalsUrl: string;
  private readonly pageSize: number;

  constructor(private http: HttpClient) {
    this.kanjisUrl = `${environment.backendUrl}/kanjis`;
    this.radicalsUrl = `${this.kanjisUrl}/radicals`;
    this.pageSize = 5;
  }

  getSuggestedRadicals(prefix?: string): Observable<KanjiRadicalsResponse> {
    let params = new HttpParams();
    if (prefix) params = params.append('prefix', prefix);
    params = params.append('page_size', this.pageSize);

    return this.http.get<KanjiRadicalsResponse>(this.radicalsUrl, { params });
  }

  getKanjiByRadicals(
    components: string[],
    pageSize: number,
    pageNumber: number
  ): Observable<CompactedKanjiResponse> {
    let params = new HttpParams();

    components.forEach((component: string, index: number) => {
      let parameter = 'c' + (index + 1);
      params = params.append(parameter, component);
    });

    params = params.append('radicalize', true);
    params = params.append('page_size', pageSize);
    params = params.append('page_number', pageNumber);
    params = params.append('compact', true);

    return this.http.get<CompactedKanjiResponse>(this.kanjisUrl, { params });
  }
}
