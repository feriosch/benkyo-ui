import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes= [
  {
    path: '',
    loadChildren: async () => {
      const m = await import('./login/login-routing.module');
      return m.LoginRoutingModule;
    }
  },
  {
    path: 'vocabulary',
    loadChildren: async () => {
      const m = await import('./vocabulary/vocabulary-routing.module');
      return m.VocabularyRoutingModule;
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
