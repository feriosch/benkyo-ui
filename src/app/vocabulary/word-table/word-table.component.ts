import {Component, Input, OnInit} from '@angular/core';
import { Word } from '../../../models/responses/vocabulary/word.model';

@Component({
  selector: 'app-word-table',
  templateUrl: './word-table.component.html',
  styleUrls: ['./word-table.component.scss']
})
export class WordTableComponent implements OnInit {

  @Input()
  words?: any;

  columnDefs: Array<any>;

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

}
