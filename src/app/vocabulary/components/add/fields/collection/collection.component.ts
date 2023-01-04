import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Collection } from 'src/models/collections/collection.model';
import { CollectionsService } from 'src/app/collections/services/collections.service';

@Component({
  selector: 'app-add-word-form-collection-field',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class AddWordFormCollectionFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  collections?: Collection[];

  constructor(private collectionsService: CollectionsService) {}

  get collectionControl() {
    return this.formGroup!.get('collection') as FormControl;
  }

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections(): void {
    this.collectionsService.getCollections().subscribe((collections) => {
      this.collections = collections;
      if (this.collections.length > 0) {
        this.collectionControl!.patchValue(this.collections[0].collection_name);
      }
    });
  }
}
