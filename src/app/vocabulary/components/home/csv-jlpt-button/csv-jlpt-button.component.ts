import { Component, OnInit } from '@angular/core';

import { VocabularyService } from 'src/app/vocabulary/services/vocabulary.service';

@Component({
  selector: 'app-vocabulary-csv-jlpt-button',
  templateUrl: './csv-jlpt-button.component.html',
})
export class WordCsvJlptButtonComponent implements OnInit {
  constructor(private vocabularyService: VocabularyService) {}

  ngOnInit(): void {}
}
