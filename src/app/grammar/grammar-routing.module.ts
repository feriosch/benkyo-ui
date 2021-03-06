import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { GrammarHomeComponent } from './views/home/home.component';
import { ClauseDetailsComponent } from './views/details/details.component';
import { GrammarAddViewComponent } from './views/add/add.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GrammarHomeComponent,
  },
  {
    path: 'add',
    component: GrammarAddViewComponent,
  },
  {
    path: 'clause/:id',
    component: ClauseDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class GrammarRoutingModule {}
