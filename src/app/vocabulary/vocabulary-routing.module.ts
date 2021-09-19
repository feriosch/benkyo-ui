import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VocabularyHomeComponent } from './vocabulary-home/vocabulary-home.component';
import { AddWordComponent } from './add-word/add-word.component';
import { WordDetailsComponent } from './word-details/word-details.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VocabularyHomeComponent
  },
  {
    path: 'add',
    component: AddWordComponent
  },
  {
    path: 'word/:id',
    component: WordDetailsComponent
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
