import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollectionsHomeViewComponent } from './views/home/home.component';
import { AddCollectionViewComponent } from './views/add/add.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CollectionsHomeViewComponent,
  },
  {
    path: 'add',
    component: AddCollectionViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsRoutingModule {}
