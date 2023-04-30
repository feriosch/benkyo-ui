import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  KanjiComponentsResponse,
  KanjiIrregularComponentsResponse,
} from 'src/models/kanji/components/responses.model';
import { CompactedKanjiResponse } from 'src/models/kanji/responses.model';

@Injectable({ providedIn: 'root' })
export class KanjiComponentService {
  private readonly kanjisUrl: string;
  private readonly componentsUrl: string;
  private readonly irregularComponentsUrl: string;
  private readonly pageSize: number;

  constructor(private http: HttpClient) {
    this.kanjisUrl = `${environment.backendUrl}/kanjis`;
    this.componentsUrl = `${environment.backendUrl}/kanjis/components`;
    this.irregularComponentsUrl = `${this.componentsUrl}/irregular`;
    this.pageSize = 5;
  }

  getSuggestedComponents(prefix: string): Observable<KanjiComponentsResponse> {
    let params = new HttpParams();
    params = params.append('prefix', prefix);
    params = params.append('page_size', this.pageSize);

    return this.http.get<KanjiComponentsResponse>(this.componentsUrl, {
      params,
    });
  }

  getKanjiByComponents(
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

  getIrregularComponents(): Observable<KanjiIrregularComponentsResponse> {
    return this.http.get<KanjiIrregularComponentsResponse>(
      this.irregularComponentsUrl
    );
  }
}
