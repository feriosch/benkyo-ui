import { Component, OnInit } from '@angular/core';
import * as fileSaver from 'file-saver';

import { KanjiService } from 'src/app/kanji/services/kanji.service';

@Component({
  selector: 'app-kanji-csv-button',
  templateUrl: './csv-button.component.html',
})
export class KanjiHomeCsvButtonComponent implements OnInit {
  constructor(private kanjiService: KanjiService) {}

  ngOnInit(): void {}

  downloadFile(): void {
    this.kanjiService.getCSVFile().subscribe((response: any) => {
      let blob: any = new Blob([response], {
        type: 'text/csv; charset=utf-8;',
      });
      fileSaver.saveAs(blob, 'kanji.csv');
    });
  }
}
