import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { KanjiHomeComponent } from './kanji-home/kanji-home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: KanjiHomeComponent,
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
