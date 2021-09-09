import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VocabularyHomeComponent } from './vocabulary-home/vocabulary-home.component';
import { AddWordFormComponent } from './add-word/add-word-form/add-word-form.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VocabularyHomeComponent
  },
  {
    path: 'add',
    component: AddWordFormComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule],
})
export class VocabularyRoutingModule { }
