import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Collection } from 'src/models/collections/collection.model';
import { CollectionsResponse } from 'src/models/collections/responses.model';

@Injectable({ providedIn: 'root' })
export class CollectionsService {
  private readonly collectionsUrl: string;
  private readonly searchCollectionUrl: string;

  constructor(private http: HttpClient) {
    this.collectionsUrl = `${environment.backendUrl}/collections`;
    this.searchCollectionUrl = `${this.collectionsUrl}/search`;
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

  get filter(): string | null {
    return localStorage.getItem('collections_filter');
  }

  set filter(filter: string | null) {
    if (filter) {
      localStorage.setItem('collections_filter', filter);
    } else {
      localStorage.removeItem('collections_filter');
    }
  }

  get pageNumber(): number | null {
    const page = localStorage.getItem('collections_page');
    if (page) {
      return +page;
    } else {
      return null;
    }
  }

  set pageNumber(page: number | null) {
    if (page) {
      localStorage.setItem('collections_page', page.toString());
    } else {
      localStorage.removeItem('collections_page');
    }
  }

  get pageSize(): number | null {
    const page = localStorage.getItem('collections_page_size');
    if (page) {
      return +page;
    } else {
      return null;
    }
  }

  set pageSize(page: number | null) {
    if (page) {
      localStorage.setItem('collections_page_size', page.toString());
    } else {
      localStorage.removeItem('collections_page_size');
    }
  }

  getCollections(): Observable<CollectionsResponse> {
    let params = new HttpParams();

    if (this.filter) params = params.append('filter', this.filter);
    if (this.pageSize) params = params.append('page_size', this.pageSize);
    if (this.pageNumber) params = params.append('page_number', this.pageNumber);

    return this.http.get<CollectionsResponse>(this.collectionsUrl, { params });
  }

  getCollection(name: string): Observable<Collection> {
    let params = new HttpParams();
    params = params.append('name', name);

    return this.http.get<Collection>(this.searchCollectionUrl, { params });
  }

  insertCollection(body: FormData): Observable<any> {
    return this.http.post(this.collectionsUrl, body);
  }
}
