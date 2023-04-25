import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { KanjiHomeViewComponent } from './views/home/home.component';
import { KanjiDetailViewComponent } from './views/detail/detail.component';
import { KanjiRadicalsViewComponent } from './views/radicals/radicals.component';

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
    path: 'radicals',
    component: KanjiRadicalsViewComponent,
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
