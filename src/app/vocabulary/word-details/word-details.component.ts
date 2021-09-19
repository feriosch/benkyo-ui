import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VocabularyService } from '../vocabulary.service';
import { Word } from '../../../models/responses/vocabulary/word.model';


@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.component.html',
  styleUrls: ['./word-details.component.scss']
})
export class WordDetailsComponent implements OnInit {

  id: string;
  word?: Word | null;
  subtypes?: string[];

  constructor(
    private route: ActivatedRoute,
    private vocabularyService: VocabularyService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.vocabularyService.getWordById(this.id)
      .subscribe((response) => {
        this.word = response;
        this.subtypes = Object.keys(response!.type)
      });
  }

  getword() {
    return JSON.stringify(this.word) + this.subtypes!.toString();
  }

}
