import { Routes } from '@angular/router';

import { GrammarHomeComponent } from './views/home/home.component';
import { ClauseDetailsComponent } from './views/details/details.component';
import { GrammarAddViewComponent } from './views/add/add.component';
import { EditClauseViewComponent } from './views/edit/edit.component';

export const grammarRoutes: Routes = [
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
  {
    path: 'clause/:id/edit',
    component: EditClauseViewComponent,
  },
];

