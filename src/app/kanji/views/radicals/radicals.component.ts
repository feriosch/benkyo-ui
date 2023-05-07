import { Component, OnInit } from '@angular/core';

import { CompactedKanji } from 'src/models/kanji/kanji.model';
import { CompactedKanjiResponse } from 'src/models/kanji/responses.model';
import { KanjiComponentService } from '../../services/component.service';
import { KanjiRadicalService } from '../../services/radicals.service';

@Component({
  selector: 'app-kanji-radicals-view',
  templateUrl: './radicals.component.html',
})
export class KanjiRadicalsViewComponent implements OnInit {
  isComponentMode: boolean;
  components: string[];
  compactedKanjis: CompactedKanji[];
  kanjisPageSize: number;
  kanjisPage: number;
  isKanjiFetchLoading: boolean;

  constructor(
    private componentService: KanjiComponentService,
    private radicalService: KanjiRadicalService
  ) {
    this.isComponentMode = true;
    this.components = [];
    this.compactedKanjis = [];
    this.kanjisPageSize = 60;
    this.kanjisPage = 1;
    this.isKanjiFetchLoading = false;
  }

  get isComponentSelected(): boolean {
    return this.components.length > 0;
  }

  ngOnInit(): void {}

  getKanjis(): void {
    this.isKanjiFetchLoading = true;
    if (this.isComponentMode && this.isComponentSelected) {
      this.componentService
        .getKanjiByComponents(
          this.components,
          this.kanjisPageSize,
          this.kanjisPage
        )
        .toPromise()
        .then((response: CompactedKanjiResponse) => {
          this.compactedKanjis = response.kanjis;
        })
        .catch((error) => console.log(error))
        .finally(() => (this.isKanjiFetchLoading = false));
    } else if (!this.isComponentMode && this.isComponentSelected) {
      this.radicalService
        .getKanjiByRadicals(
          this.components,
          this.kanjisPageSize,
          this.kanjisPage
        )
        .toPromise()
        .then((response: CompactedKanjiResponse) => {
          this.compactedKanjis = response.kanjis;
        })
        .catch((error) => console.log(error))
        .finally(() => (this.isKanjiFetchLoading = false));
    } else {
      this.compactedKanjis = [];
      this.isKanjiFetchLoading = false;
    }
  }

  switchMode(): void {
    this.isComponentMode = !this.isComponentMode;
    this.getKanjis();
  }

  addComponent(component: string): void {
    this.components.push(component);
    this.getKanjis();
  }

  removeComponent(index: number): void {
    this.components.splice(index, 1);
    this.getKanjis();
  }
}
