import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Collection } from 'src/models/collections/collection.model';
import { CollectionsService } from 'src/app/collections/services/collections.service';
import { CollectionsResponse } from 'src/models/collections/responses.model';

@Component({
  selector: 'app-add-word-form-collection-field',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class AddWordFormCollectionFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  @Input()
  currentGroup?: string;

  collections?: Collection[];

  constructor(private collectionsService: CollectionsService) {}

  get collectionControl() {
    return this.formGroup!.get('collection') as FormControl;
  }

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections(): void {
    this.collectionsService
      .getCollections()
      .toPromise()
      .then((response: CollectionsResponse) => {
        this.collections = response.collections;
        if (this.collections.length > 0) {
          this.collectionControl.patchValue(
            this.collections[0].collection_name
          );
        }
      })
      .then(() => {
        if (this.currentGroup) {
          this.collections?.forEach((collection: Collection) => {
            if (collection.collection_name === this.currentGroup)
              this.collectionControl.patchValue(collection.collection_name);
          });
        }
      });
  }
}
