import { Component, OnInit } from '@angular/core';
import * as fileSaver from 'file-saver';

import { VocabularyCsvService } from 'src/app/vocabulary/services/csv.service';

@Component({
  selector: 'app-vocabulary-csv-jlpt-button',
  templateUrl: './csv-jlpt-button.component.html',
})
export class WordCsvJlptButtonComponent implements OnInit {
  isLoading: boolean;

  constructor(private csvService: VocabularyCsvService) {
    this.isLoading = false;
  }

  downloadJlptCsvFile(): void {
    this.isLoading = true;
    this.csvService.downloadJlptCsvFile().subscribe((response: Blob) => {
      let blob: any = new Blob([response], {
        type: 'text/csv; charset=utf-8;',
      });
      fileSaver.saveAs(blob);
      this.isLoading = false;
    });
  }

  ngOnInit(): void {}
}
