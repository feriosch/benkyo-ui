import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { WordsHomeViewComponent } from './views/home/home.component';
import { AddWordViewComponent } from './views/add/add.component';
import { WordDetailsViewComponent } from './views/details/details.component';
import { EditWordFormComponent } from './add-word/edit-word-form/edit-word-form.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WordsHomeViewComponent,
  },
  {
    path: 'add',
    component: AddWordViewComponent,
  },
  {
    path: 'word/:id',
    component: WordDetailsViewComponent,
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
