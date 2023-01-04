import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsHomeViewComponent } from './views/home/home.component';
import { AddCollectionViewComponent } from './views/add/add.component';
import { CollectionCardComponent } from './components/home/card/card.component';
import { AddCollectionFormComponent } from './components/add/form/form.component';

@NgModule({
  declarations: [
    CollectionsHomeViewComponent,
    AddCollectionViewComponent,
    CollectionCardComponent,
    AddCollectionFormComponent,
  ],
  imports: [CommonModule, CollectionsRoutingModule],
})
export class CollectionsModule {}
