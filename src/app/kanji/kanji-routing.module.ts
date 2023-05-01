import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { KanjiHomeViewComponent } from './views/home/home.component';
import { KanjiDetailViewComponent } from './views/detail/detail.component';
import { EditKanjiViewComponent } from './views/edit/edit.component';
import { KanjiRadicalsViewComponent } from './views/radicals/radicals.component';
import { KanjiIrregularComponentsViewComponent } from './views/irregular/irregular.component';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class KanjiRoutingModule {}
