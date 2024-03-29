import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderDirection, OrderField } from 'src/models/requests/grammar';
import { AddClauseBody } from 'src/models/requests/grammar/add-clause.model';
import { FullClause } from 'src/models/responses/grammar/clause.model';
import {
  ClausesResponse,
  DeletedResponse,
} from 'src/models/responses/grammar/clauses-response.model';

@Injectable({ providedIn: 'root' })
export class GrammarService {
  private readonly clausesUrl: string;
  private readonly searchClauseUrl: string;

  constructor(private http: HttpClient) {
    this.clausesUrl = `${environment.backendUrl}/clauses`;
    this.searchClauseUrl = `${this.clausesUrl}/search`;
  }

  get pageSize(): number | null {
    const page = localStorage.getItem('grammar_page_size');
    if (page) {
      return +page;
    } else {
      return null;
    }
  }

  set pageSize(page: number | null) {
    if (page) {
      localStorage.setItem('grammar_page_size', page.toString());
    } else {
      localStorage.removeItem('grammar_page_size');
    }
  }

  get pageNumber(): number | null {
    const page = localStorage.getItem('grammar_page');
    if (page) {
      return +page;
    } else {
      return null;
    }
  }

  set pageNumber(page: number | null) {
    if (page) {
      localStorage.setItem('grammar_page', page.toString());
    } else {
      localStorage.removeItem('grammar_page');
    }
  }

  get filter(): string | null {
    return localStorage.getItem('grammar_filter');
  }

  set filter(filter: string | null) {
    if (filter) {
      localStorage.setItem('grammar_filter', filter);
    } else {
      localStorage.removeItem('grammar_filter');
    }
  }

  getClauses(
    orderField?: OrderField | null,
    orderDirection?: OrderDirection | null
  ): Observable<ClausesResponse> {
    let params = new HttpParams();
    if (this.filter) params = params.append('filter_by', this.filter);
    if (this.pageSize) params = params.append('page_size', this.pageSize);
    if (this.pageNumber) params = params.append('page_number', this.pageNumber);
    if (orderField) params = params.append('order_field', orderField);
    if (orderDirection)
      params = params.append('order_direction', orderDirection);

    return this.http.get<ClausesResponse>(this.clausesUrl, { params });
  }

  getFullClauseById(id: string): Observable<FullClause | null> {
    let params = new HttpParams().append('clause_id', id);
    return this.http.get<FullClause | null>(this.searchClauseUrl, { params });
  }

  addClause(body: AddClauseBody): Observable<any> {
    return this.http.post(this.clausesUrl, body);
  }

  updateClause(body: AddClauseBody): Observable<any> {
    return this.http.put(this.clausesUrl, body);
  }

  deleteClause(id: string): Observable<DeletedResponse> {
    let params = new HttpParams().append('clause_id', id);
    return this.http.delete<DeletedResponse>(this.clausesUrl, { params });
  }
}
