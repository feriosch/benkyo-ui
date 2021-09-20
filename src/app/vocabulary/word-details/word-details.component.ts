import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VocabularyService } from '../vocabulary.service';
import { WordTypeMapperService } from '../word-type-mapper.service';
import { Word } from '../../../models/responses/vocabulary/word.model';


@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.component.html',
  styleUrls: ['./word-details.component.scss']
})
export class WordDetailsComponent implements OnInit {

  id: string;
  word?: Word | null;
  subtypes: string[];

  constructor(
    private route: ActivatedRoute,
    private vocabularyService: VocabularyService,
    private typeMapperService: WordTypeMapperService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.subtypes = this.typeMapperService.backendSubtypes;
  }

  getCellValue(name: string): number {
    if (this.word!.type.hasOwnProperty(name)) {
      // @ts-ignore
      return this.word!.type[name];
    }
    return 0;
  }

  getValueText(value: number, subtype: string): string {
    let subtypeName = this.typeMapperService.getPrintingValueFromBackend(subtype)
    return this.typeMapperService.getValueText(value, subtypeName);
  }

  ngOnInit(): void {
    this.vocabularyService.getWordById(this.id)
      .subscribe((response) => {
        this.word = response;
      });
  }

  getword() {
    return JSON.stringify(this.word) + this.subtypes!.toString();
  }

}
