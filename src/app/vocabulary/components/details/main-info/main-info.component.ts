import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Collection } from 'src/models/collections/collection.model';
import { KanjiModalComponent } from '../kanji-modal/kanji-modal.component';

@Component({
  selector: 'app-word-details-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss'],
})
export class WordDetailsMainInfoComponent implements OnInit {
  @Input()
  word!: string;

  @Input()
  hiragana?: string;

  @Input()
  spanish!: string;

  @Input()
  collection!: Collection;

  @ViewChild('kanjiModal')
  kanjiModal!: KanjiModalComponent;

  selectedKanji: string | null;

  constructor() {
    this.selectedKanji = null;
  }

  ngOnInit(): void {}

  onClickCharacter(character: string): void {
    this.selectedKanji = character;
    this.kanjiModal.openModal();
  }
}
