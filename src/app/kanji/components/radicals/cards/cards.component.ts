import { Component, Input, OnInit } from '@angular/core';

import { CompactedKanji } from 'src/models/kanji/kanji.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-kanji-radicals-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  imports: [NgFor],
})
export class KanjiRadicalsCardsComponent implements OnInit {
  @Input()
  kanjis!: CompactedKanji[];

  constructor() {}

  ngOnInit(): void {}

  openLink(id: string): void {
    window.open(`kanji/detail/${id}`);
  }
}
