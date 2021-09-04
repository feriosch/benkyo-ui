import { Component, Input, OnInit } from '@angular/core';
import { AgGridEvent, ColDef } from 'ag-grid-community';

import { Word } from '../../../../models/responses/vocabulary/word.model';


@Component({
  selector: 'app-word-table',
  templateUrl: './word-table.component.html',
  styleUrls: ['./word-table.component.scss']
})
export class WordTableComponent implements OnInit {

  @Input()
  words: any;
  columnDefs: ColDef[];

  constructor() {
    this.words = new Array<Word>();
    this.columnDefs = [
      { field: 'word' },
      { field: 'hiragana' },
      { field: 'spanish'}
    ]
  }

  ngOnInit(): void {
  }

  onGridReady(params: AgGridEvent) {
    params.api.sizeColumnsToFit();
  }

}
