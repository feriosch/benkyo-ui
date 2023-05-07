import { Component, Input, OnInit } from '@angular/core';

import { Collection } from 'src/models/collections/collection.model';

@Component({
  selector: 'app-collection-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CollectionCardComponent implements OnInit {
  @Input()
  collection!: Collection;

  constructor() {}

  get imageUrl(): string {
    return this.collection.image_url;
  }

  get printingName(): string {
    return this.collection.printing_name;
  }

  ngOnInit(): void {}
}
