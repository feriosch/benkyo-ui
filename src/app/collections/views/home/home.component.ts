import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Collection } from 'src/models/collections/collection.model';
import { CollectionsService } from '../../services/collections.service';

@Component({
  selector: 'app-collections-home-view',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class CollectionsHomeViewComponent implements OnInit {
  collections$: Observable<Collection[]>;

  constructor(
    private collectionsService: CollectionsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.collections$ = new Observable<Collection[]>();
  }

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections(): void {
    this.collections$ = this.collectionsService.getCollections();
  }

  async navigateTo(route: string) {
    await this.router.navigate([`./${route}`], { relativeTo: this.route });
  }
}
