import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Word } from 'src/models/responses/vocabulary/word.model';
import { Collection } from 'src/models/collections/collection.model';
import { CollectionsService } from 'src/app/collections/services/collections.service';
import { VocabularyService } from '../../services/vocabulary.service';
import { TagsMapperService } from '../../services/tags-mapper.service';

@Component({
  selector: 'app-word-details-view',
  templateUrl: './details.component.html',
})
export class WordDetailsViewComponent implements OnInit {
  id: string;
  word?: Word | null;
  collection?: Collection;
  tags: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collectionsService: CollectionsService,
    private vocabularyService: VocabularyService,
    private tagMapperService: TagsMapperService,
  ) {
    this.id = this.route.snapshot.params['id'];
    this.tags = [];
  }

  getTagValueText(tag: string): string {
    return this.tagMapperService.getPrintingValueFromBackend(tag);
  }

  async onClickBack() {
    await this.router.navigateByUrl('/vocabulary');
  }

  async onClickEdit() {
    await this.router.navigate(['edit'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.vocabularyService.getWordById(this.id).subscribe((response) => {
      this.word = response;
      if (this.word!.tags) {
        this.tags = this.word!.tags;
      }
      this.collectionsService
        .getCollection(this.word?.group!)
        .subscribe((response) => {
          this.collection = response;
        });
    });
  }
}
