import { Routes } from '@angular/router';

import { CollectionsHomeViewComponent } from './views/home/home.component';
import { AddCollectionViewComponent } from './views/add/add.component';

export const collectionsRoutes: Routes = [
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

