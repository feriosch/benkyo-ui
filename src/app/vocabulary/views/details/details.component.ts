import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Word } from 'src/models/responses/vocabulary/word.model';
import { Collection } from 'src/models/collections/collection.model';
import { CollectionsService } from 'src/app/collections/services/collections.service';
import { VocabularyService } from '../../services/vocabulary.service';
import { WordDetailsDeleteModalComponent } from '../../components/details/delete-modal/delete-modal.component';

import { WordDetailsMainInfoComponent } from '../../components/details/main-info/main-info.component';
import { WordDetailsTypeTableComponent } from '../../components/details/type-table/type-table.component';
import { WordDetailsTagsComponent } from '../../components/details/tags/tags.component';
import { WordDetailsRelatedWordsComponent } from '../../components/details/related-words/related-words.component';

@Component({
  selector: 'app-word-details-view',
  templateUrl: './details.component.html',
  imports: [
    WordDetailsMainInfoComponent,
    WordDetailsTypeTableComponent,
    WordDetailsTagsComponent,
    WordDetailsRelatedWordsComponent,
    WordDetailsDeleteModalComponent,
  ],
})
export class WordDetailsViewComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal!: WordDetailsDeleteModalComponent;

  id: string;
  word?: Word | null;
  collection?: Collection;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collectionsService: CollectionsService,
    private vocabularyService: VocabularyService,
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    // Subscribe to route param changes to handle navigation between related words
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.loadWord();
    });
  }

  private loadWord(): void {
    this.vocabularyService.getWordById(this.id).subscribe((response) => {
      this.word = response;
      this.collectionsService
        .getCollection(this.word?.group!)
        .subscribe((response) => {
          this.collection = response;
        });
    });
  }

  async onClickBack() {
    await this.router.navigateByUrl('/vocabulary');
  }

  async onClickEdit() {
    await this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onClickDelete() {
    this.deleteModal.openModal();
    console.log('dfojsid');
  }
}
