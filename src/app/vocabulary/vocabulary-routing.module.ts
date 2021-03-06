import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VocabularyHomeComponent } from './home/vocabulary-home.component';
import { AddWordComponent } from './add-word/add-word.component';
import { WordDetailsComponent } from './word-details/word-details.component';
import { EditWordFormComponent } from './add-word/edit-word-form/edit-word-form.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VocabularyHomeComponent,
  },
  {
    path: 'add',
    component: AddWordComponent,
  },
  {
    path: 'word/:id',
    component: WordDetailsComponent,
  },
  {
    path: 'word/:id/edit',
    component: EditWordFormComponent,
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
export class VocabularyRoutingModule {}
