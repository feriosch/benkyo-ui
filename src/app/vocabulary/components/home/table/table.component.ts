import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  AgGridEvent,
  ColDef,
  GridOptions,
  RowDoubleClickedEvent,
} from 'ag-grid-community';

import { SummarizedWord } from 'src/models/responses/vocabulary/words-response.model';

@Component({
  selector: 'app-word-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class WordTableComponent implements OnInit {
  @Input()
  words?: SummarizedWord[];

  @Input()
  currentPage?: number;

  @Input()
  totalPages?: number;

  @Input()
  totalWords?: number;

  @Input()
  isWordFetchLoading?: boolean;

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
        field: 'word',
        maxWidth: 400,
        cellClass: 'has-text-weight-medium',
      },
      {
        field: 'hiragana',
        maxWidth: 400,
      },
      { field: 'spanish' },
    ];
    this.gridOptions = {
      suppressRowDeselection: true,
      rowClass: 'is-size-5',
    };
    this.rowHeight = 50;
  }

  isBackwardPossible(): boolean {
    return this.currentPage! > 1 && !this.isWordFetchLoading!;
  }

  isForwardPossible(): boolean {
    return this.currentPage! < this.totalPages! && !this.isWordFetchLoading!;
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

  ngOnInit(): void {}

  async onRowClicked(event: RowDoubleClickedEvent) {
    await this.router.navigateByUrl(`vocabulary/word/${event.data.id}`);
  }
}
