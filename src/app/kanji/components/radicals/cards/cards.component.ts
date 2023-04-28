import { Component, Input, OnInit } from '@angular/core';

import { CompactedKanji } from 'src/models/kanji/kanji.model';

@Component({
  selector: 'app-kanji-radicals-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class KanjiRadicalsCardsComponent implements OnInit {
  @Input()
  kanjis: CompactedKanji[];

  constructor() {
    this.kanjis = [];
  }

  ngOnInit(): void {}
}
