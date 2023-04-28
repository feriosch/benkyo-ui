import { Component, OnInit } from '@angular/core';
import { KanjiComponentService } from '../../services/component.service';
import { CompactedKanji } from 'src/models/kanji/kanji.model';
import { CompactedKanjiResponse } from 'src/models/kanji/responses.model';

@Component({
  selector: 'app-kanji-radicals-view',
  templateUrl: './radicals.component.html',
  styleUrls: ['./radicals.component.scss'],
})
export class KanjiRadicalsViewComponent implements OnInit {
  selectedComponents: string[];
  compactedKanjis: CompactedKanji[];
  kanjisPageSize: number;
  kanjisPage: number;
  isKanjiFetchLoading: boolean;

  constructor(private kanjiComponentService: KanjiComponentService) {
    this.selectedComponents = [];
    this.compactedKanjis = [];
    this.kanjisPageSize = 50;
    this.kanjisPage = 1;
    this.isKanjiFetchLoading = false;
  }

  get isComponentSelected(): boolean {
    return this.selectedComponents.length > 0;
  }

  ngOnInit(): void {}

  getKanjis(): void {
    this.isKanjiFetchLoading = true;
    if (this.isComponentSelected) {
      this.kanjiComponentService
        .getCompactKanjisByComponents(
          this.selectedComponents,
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

  addComponent(component: string): void {
    this.selectedComponents.push(component);
    this.getKanjis();
  }

  removeComponent(index: number): void {
    this.selectedComponents.splice(index, 1);
    this.getKanjis();
  }
}
