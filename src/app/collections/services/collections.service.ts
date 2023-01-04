import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Collection } from 'src/models/collections/collection.model';

@Injectable({ providedIn: 'root' })
export class CollectionsService {
  private readonly collectionsUrl: string;

  constructor(private http: HttpClient) {
    this.collectionsUrl = `${environment.backendUrl}/collections`;
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

  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.collectionsUrl);
  }

  getCollection(name: string): Observable<Collection> {
    let params = new HttpParams();
    params = params.append('name', name);

    return this.http.get<Collection>(this.collectionsUrl, { params });
  }
}
