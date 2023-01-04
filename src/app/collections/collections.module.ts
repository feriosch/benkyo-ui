import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsHomeViewComponent } from './views/home/home.component';
import { AddCollectionViewComponent } from './views/add/add.component';
import { CollectionCardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    CollectionsHomeViewComponent,
    CollectionCardComponent,
    AddCollectionViewComponent,
  ],
  imports: [CommonModule, CollectionsRoutingModule],
})
export class CollectionsModule {}
