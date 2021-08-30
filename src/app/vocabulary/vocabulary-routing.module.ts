import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { VocabularyHomeComponent } from './vocabulary-home/vocabulary-home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VocabularyHomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VocabularyRoutingModule { }
