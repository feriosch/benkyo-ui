import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  AgGridEvent,
  ColDef,
  GridOptions,
  RowDoubleClickedEvent,
} from 'ag-grid-community';

import { SummarizedClause } from 'src/models/responses/grammar/clauses-response.model';
import { GrammarService } from '../../grammar.service';

@Component({
  selector: 'app-grammar-table',
  templateUrl: './grammar-table.component.html',
  styleUrls: ['./grammar-table.component.scss'],
})
export class GrammarTableComponent implements OnInit {
  @Input()
  clauses?: SummarizedClause[];

  @Input()
  currentPage?: number;

  @Input()
  totalPages?: number;

  @Input()
  totalClauses?: number;

  @Input()
  isClauseFetchLoading?: boolean;

  @Output()
  clickedPreviousPage: EventEmitter<any>;

  @Output()
  clickedNextPage: EventEmitter<any>;

  @Output()
  clickedFirstPage: EventEmitter<any>;

  @Output()
  clickedLastPage: EventEmitter<any>;

  columnDefs: ColDef[];
  gridOptions: GridOptions;
  rowHeight: number;

  constructor(private router: Router) {
    this.clickedPreviousPage = new EventEmitter();
    this.clickedNextPage = new EventEmitter();
    this.clickedFirstPage = new EventEmitter();
    this.clickedLastPage = new EventEmitter();
    this.columnDefs = [
      {
        field: 'title',
        maxWidth: 300,
        cellClass: ['has-text-weight-medium'],
      },
      {
        field: 'hiragana',
        maxWidth: 300,
      },
      {
        field: 'translation',
      },
      {
        field: 'level',
        maxWidth: 250
      },
    ];
    this.gridOptions = {
      suppressCellSelection: true,
      rowClass: ['is-size-5'],
    };
    this.rowHeight = 50;
  }

  isBackwardPossible(): boolean {
    return this.currentPage! > 1 && !this.isClauseFetchLoading!;
  }

  isForwardPossible(): boolean {
    return this.currentPage! < this.totalPages! && !this.isClauseFetchLoading!;
  }

  onClickPreviousPage(): void {
    if (this.isBackwardPossible()) this.clickedPreviousPage.emit();
  }

  onClickNextPage(): void {
    if (this.isForwardPossible()) this.clickedNextPage.emit();
  }

  onClickFirstPage(): void {
    if (this.isBackwardPossible()) this.clickedFirstPage.emit();
  }

  onClickLastPage(): void {
    if (this.isForwardPossible()) this.clickedLastPage.emit();
  }

  onGridReady(params: AgGridEvent) {
    params.api.sizeColumnsToFit();
  }

  async onRowClicked(event: RowDoubleClickedEvent) {
    await this.router.navigateByUrl(`grammar/search/${event.data.id}`);
  }

  ngOnInit(): void {}
}
