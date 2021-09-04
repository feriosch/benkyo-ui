import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Collection } from '../../../../models/responses/vocabulary/collection.model';


@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss']
})
export class CollectionCardComponent implements OnInit {

  @Input()
  collection?: Collection;

  @Input()
  currentSelection?: string | null;

  @Output()
  collectionSelected: EventEmitter<string>;

  constructor() {
    this.collectionSelected = new EventEmitter<string>();
  }

  onCollectionClicked(): void {
    this.collectionSelected.emit(this.collection!.collection_name);
  }

  isCurrentCollection(): boolean {
    return this.collection?.collection_name === this.currentSelection
  }

  ngOnInit(): void {
  }

}
