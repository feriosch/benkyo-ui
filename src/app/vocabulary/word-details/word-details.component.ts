import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { VocabularyService } from '../vocabulary.service';
import { WordTypeMapperService } from '../word-type-mapper.service';
import { WordTagsMapperService } from '../word-tags-mapper.service';
import { Word } from '../../../models/responses/vocabulary/word.model';
import { Collection } from '../../../models/responses/vocabulary/collection.model';


@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.component.html',
  styleUrls: ['./word-details.component.scss']
})
export class WordDetailsComponent implements OnInit {

  id: string;
  word?: Word | null;
  collection?: Collection;
  subtypes: string[];
  tags: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vocabularyService: VocabularyService,
    private typeMapperService: WordTypeMapperService,
    private tagMapperService: WordTagsMapperService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.subtypes = this.typeMapperService.backendSubtypes;
    this.tags = [];
  }

  getCellValue(name: string): number {
    if (this.word?.type.hasOwnProperty(name)) {
      // @ts-ignore
      return this.word?.type[name];
    }
    return 0;
  }

  getSubtypeValueText(value: number, subtype: string): string {
    let subtypeName = this.typeMapperService.getPrintingValueFromBackend(subtype)
    return this.typeMapperService.getValueText(value, subtypeName);
  }

  getTagValueText(tag: string): string {
    return this.tagMapperService.getPrintingValueFromBackend(tag);
  }

  async onClickBack() {
    await this.router.navigateByUrl('/vocabulary');
  }

  async onClickEdit() {
    await this.router.navigate(['edit'], { relativeTo: this.route })
  }

  ngOnInit(): void {
    this.vocabularyService.getWordById(this.id)
      .subscribe((response) => {
        this.word = response;
        if (this.word?.tags) {
          for (const [key] of Object.entries(this.word?.tags)) {
            this.tags.push(key);
          }
        }
        this.vocabularyService.getCollection(this.word?.from!)
          .subscribe((response) => {
            this.collection = response;
          })
      });
  }

}
