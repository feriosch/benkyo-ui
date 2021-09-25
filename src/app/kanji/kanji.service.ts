import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Kanji } from '../../models/responses/kanji/kanji.model';


@Injectable({ providedIn: 'root' })
export class KanjiService {
  private readonly kanjisUrl: string;
  private readonly searchOneKanjiUrl: string;

  constructor(private http: HttpClient) {
    this.kanjisUrl = `${environment.backendUrl}/kanjis`;
    this.searchOneKanjiUrl = `${environment.backendUrl}/kanjis/searchone`;
  }

  getKanjiByKanji(kanji: string): Observable<Kanji | null> {
    let params = new HttpParams().append('kanji', kanji);
    return this.http.get<Kanji | null>(this.searchOneKanjiUrl, { params });
  }
}
