import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  AgGridEvent,
  ColDef,
  GridOptions,
  RowDoubleClickedEvent,
} from 'ag-grid-community';

import { SummarizedKanji } from 'src/models/responses/kanji/kanji.model';

@Component({
  selector: 'app-kanji-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class KanjiTableComponent implements OnInit {
  @Input()
  kanjis?: SummarizedKanji[];

  @Input()
  currentPage?: number;

  @Input()
  totalPages?: number;

  @Input()
  totalKanjis?: number;

  @Input()
  isKanjiFetchLoading?: boolean;

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
        field: 'kanji',
        maxWidth: 150,
        cellClass: ['has-text-weight-semibold'],
        cellStyle: { marginLeft: '6px' },
      },
      {
        field: 'v1',
        maxWidth: 100,
        cellClass: ['is-size-6'],
      },
      {
        field: 'v2',
        maxWidth: 100,
        cellClass: ['is-size-6'],
      },
      {
        field: 'on',
        maxWidth: 250,
        cellClass: ['has-text-weight-medium', 'on-yomi'],
      },
      {
        field: 'kun',
        cellClass: ['has-text-weight-medium', 'kun-yomi'],
      },
      {
        field: 'spanish',
      },
    ];
    this.gridOptions = {
      suppressCellSelection: true,
      rowClass: ['is-size-5'],
    };
    this.rowHeight = 50;
  }

  isBackwardPossible(): boolean {
    return this.currentPage! > 1 && !this.isKanjiFetchLoading!;
  }

  isForwardPossible(): boolean {
    return this.currentPage! < this.totalPages! && !this.isKanjiFetchLoading!;
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
    await this.router.navigateByUrl(`kanji/${event.data.id}`);
  }
}
