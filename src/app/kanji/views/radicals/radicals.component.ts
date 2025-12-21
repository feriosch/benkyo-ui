import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { CompactedKanji } from 'src/models/kanji/kanji.model';
import { KanjiComponentService } from '../../services/component.service';
import { KanjiRadicalService } from '../../services/radicals.service';
import { CompactedKanjiResponse } from 'src/models/kanji/responses.model';
import { KanjiRadicalsSearchComponent } from '../../components/radicals/search/search.component';
import { KanjiRadicalsTagsComponent } from '../../components/radicals/tags/tags.component';
import { KanjiRadicalsCardsComponent } from '../../components/radicals/cards/cards.component';

@Component({
  selector: 'app-kanji-radicals-view',
  templateUrl: './radicals.component.html',
  imports: [
    KanjiRadicalsSearchComponent,
    KanjiRadicalsTagsComponent,
    KanjiRadicalsCardsComponent,
  ],
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
    private radicalService: KanjiRadicalService,
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
      firstValueFrom(
        this.componentService.getKanjiByComponents(
          this.components,
          this.kanjisPageSize,
          this.kanjisPage,
        ),
      )
        .then((response: CompactedKanjiResponse) => {
          this.compactedKanjis = response.kanjis;
        })
        .catch((error) => console.log(error))
        .finally(() => (this.isKanjiFetchLoading = false));
    } else if (!this.isComponentMode && this.isComponentSelected) {
      firstValueFrom(
        this.radicalService.getKanjiByRadicals(
          this.components,
          this.kanjisPageSize,
          this.kanjisPage,
        ),
      )
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
