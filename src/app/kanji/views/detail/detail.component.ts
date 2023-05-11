import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Kanji } from 'src/models/responses/kanji/kanji.model';
import { KanjiService } from '../../services/kanji.service';

@Component({
  selector: 'app-kanji-detail-view',
  templateUrl: './detail.component.html',
})
export class KanjiDetailViewComponent implements OnInit {
  id: string;
  // TODO: Loading is not working as expected
  isLoading: boolean;
  fullKanji?: Kanji | null;
  v1?: number;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private kanjiService: KanjiService
  ) {
    this.isLoading = true;
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.kanjiService.getKanjiById(this.id).subscribe((response) => {
      this.fullKanji = response;
      this.v1 = this.fullKanji!.v1;
      this.isLoading = false;
    });
  }

  private loadKanji(): void {
    this.kanjiService.getKanjiByV1(this.v1!).subscribe((response) => {
      this.fullKanji = response;
      this.id = response!.id;
      this.location.replaceState(`kanji/detail/${this.id}`);
      this.isLoading = false;
    });
  }

  getPreviousKanji(): void {
    this.isLoading = true;
    this.v1! -= 1;
    this.loadKanji();
  }

  getNextKanji(): void {
    this.isLoading = true;
    this.v1! += 1;
    this.loadKanji();
  }
}
