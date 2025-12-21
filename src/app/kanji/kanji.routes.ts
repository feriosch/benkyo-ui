import { Routes } from '@angular/router';

import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { KanjiHomeViewComponent } from './views/home/home.component';
import { KanjiDetailViewComponent } from './views/detail/detail.component';
import { EditKanjiViewComponent } from './views/edit/edit.component';
import { KanjiRadicalsViewComponent } from './views/radicals/radicals.component';
import { KanjiIrregularComponentsViewComponent } from './views/irregular/irregular.component';

export const kanjiRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: KanjiHomeViewComponent,
  },
  {
    path: 'detail/:id',
    component: KanjiDetailViewComponent,
  },
  {
    path: 'detail/:id/edit',
    component: EditKanjiViewComponent,
  },
  {
    path: 'radicals',
    component: KanjiRadicalsViewComponent,
  },
  {
    path: 'irregularcomponents',
    component: KanjiIrregularComponentsViewComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

