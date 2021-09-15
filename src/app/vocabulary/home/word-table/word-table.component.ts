import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AgGridEvent, ColDef } from 'ag-grid-community';

import { Word } from '../../../../models/responses/vocabulary/word.model';


@Component({
  selector: 'app-word-table',
  templateUrl: './word-table.component.html',
  styleUrls: ['./word-table.component.scss']
})
export class WordTableComponent implements OnInit {

  @Input()
  words?: Word[];

  @Input()
  currentPage?: number;

  @Input()
  totalPages?: number;

  @Input()
  totalWords?: number;

  @Output()
  clickedPreviousPage: EventEmitter<any>;

  @Output()
  clickedNextPage: EventEmitter<any>;

  @Output()
  clickedFirstPage: EventEmitter<any>;

  @Output()
  clickedLastPage: EventEmitter<any>;

  columnDefs: ColDef[];

  constructor() {
    this.clickedPreviousPage = new EventEmitter();
    this.clickedNextPage = new EventEmitter();
    this.clickedFirstPage = new EventEmitter();
    this.clickedLastPage = new EventEmitter();
    this.columnDefs = [
      { field: 'word' },
      { field: 'hiragana' },
      { field: 'spanish'}
    ]
  }

  isBackwardPossible(): boolean {
    return this.currentPage! > 1;
  }

  isForwardPossible(): boolean {
    return this.currentPage! < this.totalPages!;
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

  ngOnInit(): void {
  }

}
