import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Collection } from 'src/models/responses/vocabulary/collection.model';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss'],
})
export class CollectionCardComponent implements OnInit {
  @Input()
  collection?: Collection;

  @Input()
  currentSelection?: string | null;

  @Output()
  collectionSelected: EventEmitter<string | null>;

  constructor() {
    this.collectionSelected = new EventEmitter<string | null>();
  }

  onCollectionClicked(): void {
    if (this.isCurrentCollection()) {
      this.collectionSelected.emit(null);
    } else {
      this.collectionSelected.emit(this.collection!.collection_name);
    }
  }

  isCurrentCollection(): boolean {
    return this.collection?.collection_name === this.currentSelection;
  }

  ngOnInit(): void {}
}
