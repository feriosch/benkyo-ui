import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { CollectionsService } from 'src/app/collections/services/collections.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VocabularyCsvService {
  private readonly wordsCsvUrl: string;
  private readonly jlptCsvUrl: string;

  constructor(
    private http: HttpClient,
    private collectionsService: CollectionsService
  ) {
    this.wordsCsvUrl = `${environment.backendUrl}/words/csv`;
    this.jlptCsvUrl = `${this.wordsCsvUrl}/jlpt`;
  }

  downloadCsvFile(): Observable<Blob> {
    let params = new HttpParams();
    if (this.collectionsService.currentCollection)
      params = params.append(
        'group',
        this.collectionsService.currentCollection
      );
    return this.http.get(this.wordsCsvUrl, { params, responseType: 'blob' });
  }

  downloadJlptCsvFile(): Observable<Blob> {
    return this.http.get(this.jlptCsvUrl, { responseType: 'blob' });
  }
}
