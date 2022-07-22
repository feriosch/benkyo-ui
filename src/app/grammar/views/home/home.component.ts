import { Component, OnInit } from '@angular/core';

import { OrderDirection, OrderField } from 'src/models/requests/grammar';
import { SummarizedClause } from 'src/models/responses/grammar/clauses-response.model';
import { GrammarService } from 'src/app/grammar/services/grammar.service';

@Component({
  selector: 'app-grammar-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class GrammarHomeComponent implements OnInit {
  nextPageNumber: string;
  totalPages: number;
  totalClauses: number;
  filter: string | null;
  orderField: OrderField | null;
  orderDirection: OrderDirection | null;
  isClauseFetchLoading: boolean;
  clauses: SummarizedClause[];

  constructor(public grammarService: GrammarService) {
    this.nextPageNumber = '';
    this.totalPages = 0;
    this.totalClauses = 0;
    this.filter = this.grammarService.filter;
    this.orderField = null;
    this.orderDirection = null;
    this.isClauseFetchLoading = false;
    this.clauses = [];
  }

  getClauses(): void {
    this.isClauseFetchLoading = true;
    this.grammarService
      .getClauses(this.orderField, this.orderDirection)
      .toPromise()
      .then((response) => {
        this.clauses = response.clauses;
        this.nextPageNumber = response.next_page_number;
        this.totalPages = response.total_pages;
        this.totalClauses = response.total_clauses;
      })
      .catch((error) => console.log(error))
      .finally(() => (this.isClauseFetchLoading = false));
  }

  applyFilter(): void {
    if (this.filter) {
      this.grammarService.filter = this.filter;
      this.grammarService.pageNumber = 1;
      this.getClauses();
    }
  }

  onChangeFilter(value: any) {
    if (!value) {
      this.grammarService.filter = null;
      this.grammarService.pageNumber = 1;
      this.getClauses();
    }
  }

  changeToFirstPage(): void {
    if (this.grammarService.pageNumber! > 1) {
      this.grammarService.pageNumber = 1;
    }
    this.getClauses();
  }

  changeToPreviousPage(): void {
    if (this.grammarService.pageNumber! > 1) {
      this.grammarService.pageNumber = this.grammarService.pageNumber! - 1;
    }
    this.getClauses();
  }

  changeToNextPage(): void {
    if (this.nextPageNumber) {
      this.grammarService.pageNumber = +this.nextPageNumber;
    }
    this.getClauses();
  }

  changeToLastPage(): void {
    if (this.grammarService.pageNumber! < this.totalPages) {
      this.grammarService.pageNumber = this.totalPages;
    }
    this.getClauses();
  }

  ngOnInit(): void {
    if (!this.grammarService.pageSize) {
      this.grammarService.pageSize = 10;
    }
    if (!this.grammarService.pageNumber) {
      this.grammarService.pageNumber = 1;
    }
    this.getClauses();
  }
}
