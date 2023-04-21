import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-kanji-detail-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class KanjiDetailInfoComponent implements OnInit {
  @Input()
  kanji: string;

  @Input()
  spanish: string;

  @Input()
  on: string | null;

  @Input()
  kun: string | null;

  constructor() {
    this.kanji = '';
    this.spanish = '';
    this.on = null;
    this.kun = null;
  }

  ngOnInit(): void {}
}
