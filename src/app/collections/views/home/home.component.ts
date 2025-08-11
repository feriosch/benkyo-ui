import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Collection } from 'src/models/collections/collection.model';
import { CollectionsService } from '../../services/collections.service';
import { CollectionsResponse } from 'src/models/collections/responses.model';

@Component({
  selector: 'app-collections-home-view',
  templateUrl: './home.component.html',
})
export class CollectionsHomeViewComponent implements OnInit {
  collections: Collection[];

  constructor(
    private collectionsService: CollectionsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.collections = [];
  }

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections(): void {
    this.collectionsService
      .getCollections()
      .subscribe((response: CollectionsResponse) => {
        this.collections = response.collections;
      });
  }

  async navigateToAdd() {
    await this.router.navigate(['add'], { relativeTo: this.route });
  }
}
