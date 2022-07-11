import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GrammarHomeComponent } from './grammar-home/grammar-home.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GrammarHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class GrammarRoutingModule {}
