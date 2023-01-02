import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Collection } from 'src/models/responses/vocabulary/collection.model';
import { VocabularyService } from 'src/app/vocabulary/services/vocabulary.service';

@Component({
  selector: 'app-add-word-form-collection-field',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class AddWordFormCollectionFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  collections?: Collection[];

  constructor(private vocabularyService: VocabularyService) {}

  get collectionControl() {
    return this.formGroup!.get('collection') as FormControl;
  }

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections(): void {
    this.vocabularyService.getCollections().subscribe((collections) => {
      this.collections = collections;
      if (this.collections.length > 0) {
        this.collectionControl!.patchValue(this.collections[0].collection_name);
      }
    });
  }
}
