import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsHomeViewComponent } from './views/home/home.component';

@NgModule({
  declarations: [CollectionsHomeViewComponent],
  imports: [CommonModule, CollectionsRoutingModule],
})
export class CollectionsModule {}
