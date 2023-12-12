import { Component, Input, OnInit } from '@angular/core';
import * as fileSaver from 'file-saver';

import { VocabularyCsvService } from 'src/app/vocabulary/services/csv.service';
@Component({
  selector: 'app-vocabulary-csv-button',
  templateUrl: './csv-button.component.html',
})
export class WordCsvButtonComponent implements OnInit {
  @Input()
  currentSelection?: string | null;

  constructor(public csvService: VocabularyCsvService) {}

  downloadFile() {
    let filename: string = 'benkyo';
    if (this.currentSelection) filename = this.currentSelection;

    this.csvService.downloadCsvFile().subscribe((response: any) => {
      let blob: any = new Blob([response], {
        type: 'text/csv; charset=utf-8;',
      });
      fileSaver.saveAs(blob, `${filename}.csv`);
    });
  }

  ngOnInit(): void {}
}
