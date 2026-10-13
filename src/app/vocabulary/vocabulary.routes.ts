import { Routes } from '@angular/router';

import { WordsHomeViewComponent } from './views/home/home.component';
import { WordDetailsViewComponent } from './views/details/details.component';
import { EditWordViewComponent } from './views/edit/edit.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';

export const vocabularyRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WordsHomeViewComponent,
  },
  {
    path: 'word/:id',
    component: WordDetailsViewComponent,
  },
  {
    path: 'word/:id/edit',
    component: EditWordViewComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

