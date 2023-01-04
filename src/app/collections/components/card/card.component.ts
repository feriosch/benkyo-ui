import { Component, Input, OnInit } from '@angular/core';

import { Collection } from 'src/models/collections/collection.model';

@Component({
  selector: 'app-collection-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CollectionCardComponent implements OnInit {
  @Input()
  collection?: Collection;

  constructor() {}

  ngOnInit(): void {}
}
