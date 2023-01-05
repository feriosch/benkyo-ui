import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsHomeViewComponent } from './views/home/home.component';
import { AddCollectionViewComponent } from './views/add/add.component';
import { CollectionCardComponent } from './components/home/card/card.component';
import { AddCollectionFormComponent } from './components/add/form/form.component';
import { AddCollectionFormNameFieldComponent } from './components/add/fields/name/name.component';
import { AddCollectionFormImageFieldComponent } from './components/add/fields/image/image.component';

@NgModule({
  declarations: [
    CollectionsHomeViewComponent,
    AddCollectionViewComponent,
    CollectionCardComponent,
    AddCollectionFormComponent,
    AddCollectionFormNameFieldComponent,
    AddCollectionFormImageFieldComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CollectionsRoutingModule,
  ],
})
export class CollectionsModule {}
