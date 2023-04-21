import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Kanji } from 'src/models/responses/kanji/kanji.model';
import { KanjiService } from '../../services/kanji.service';

@Component({
  selector: 'app-kanji-detail-view',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class KanjiDetailViewComponent implements OnInit {
  private readonly id: string;
  // TODO: Loading is not working as expected
  isLoading: boolean;
  fullKanji?: Kanji | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private kanjiService: KanjiService
  ) {
    this.isLoading = true;
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.kanjiService.getKanjiById(this.id).subscribe((response) => {
      this.fullKanji = response;
      this.isLoading = false;
      console.log(this.fullKanji);
    });
  }

  async onClickBack() {
    await this.router.navigateByUrl('/kanji');
  }
}
