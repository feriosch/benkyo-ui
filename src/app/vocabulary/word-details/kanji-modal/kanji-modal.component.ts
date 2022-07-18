import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { Kanji } from 'src/models/responses/kanji/kanji.model';
import { KanjiService } from 'src/app/kanji/kanji.service';

@Component({
  selector: 'app-kanji-modal',
  templateUrl: './kanji-modal.component.html',
  styleUrls: ['./kanji-modal.component.scss'],
})
export class KanjiModalComponent implements OnInit, OnChanges {
  @Input()
  character: string | null;

  isActive: boolean;
  isLoading: boolean;
  kanjiInfo: Kanji | null;
  error: string | null;

  constructor(private kanjiService: KanjiService) {
    this.character = null;
    this.isActive = false;
    this.isLoading = false;
    this.kanjiInfo = null;
    this.error = null;
  }

  openModal(): void {
    this.isActive = true;
  }

  closeModal(): void {
    this.isActive = false;
  }

  getKanjiInfo(): void {
    this.isLoading = true;
    this.kanjiService.getKanjiByKanji(this.character!).subscribe(
      (response) => {
        this.kanjiInfo = response;
        this.error = null;
        this.isLoading = false;
      },
      (error) => {
        this.error = error.error.error;
        this.kanjiInfo = null;
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.character) {
      this.getKanjiInfo();
    }
  }
}
