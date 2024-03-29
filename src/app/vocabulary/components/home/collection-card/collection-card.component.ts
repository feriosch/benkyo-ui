import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Collection } from 'src/models/collections/collection.model';

@Component({
  selector: 'app-vocabulary-collection-card',
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
