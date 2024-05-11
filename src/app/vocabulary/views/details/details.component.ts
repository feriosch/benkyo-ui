import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Word } from 'src/models/responses/vocabulary/word.model';
import { Collection } from 'src/models/collections/collection.model';
import { CollectionsService } from 'src/app/collections/services/collections.service';
import { VocabularyService } from '../../services/vocabulary.service';
import { WordDetailsDeleteModalComponent } from '../../components/details/delete-modal/delete-modal.component';

@Component({
  selector: 'app-word-details-view',
  templateUrl: './details.component.html',
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
    console.log('dfojsid')
  }
}
