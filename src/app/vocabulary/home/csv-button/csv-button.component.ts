import { Component, Input, OnInit } from '@angular/core';
import * as fileSaver from 'file-saver';

import { VocabularyService } from '../../vocabulary.service';

@Component({
  selector: 'app-csv-button',
  templateUrl: './csv-button.component.html',
  styleUrls: ['./csv-button.component.scss']
})
export class CsvButtonComponent implements OnInit {

  @Input()
  currentSelection?: string | null;

  constructor(public vocabularyService: VocabularyService) { }

  downloadFile() {
    let filename: string = 'benkyo';
    if (this.currentSelection) filename = this.currentSelection;

    this.vocabularyService.downloadCSVFile()
      .subscribe((response: any) => {
        let blob: any = new Blob([response], { type: 'text/csv; charset=utf-8;' });
        fileSaver.saveAs(blob, `${filename}.csv`)
      });
  }

  ngOnInit(): void {
  }

}
