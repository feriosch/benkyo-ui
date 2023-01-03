import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuardService } from './auth/services/auth-guard.service';
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';
import { LoginGuardService } from './auth/services/login-guard.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/vocabulary',
  },
  {
    path: 'login',
    canActivate: [LoginGuardService],
    loadChildren: async () => {
      const m = await import('./auth/auth-routing.module');
      return m.AuthRoutingModule;
    },
  },
  {
    path: 'vocabulary',
    canActivate: [AuthGuardService],
    loadChildren: async () => {
      const m = await import('./vocabulary/vocabulary-routing.module');
      return m.VocabularyRoutingModule;
    },
  },
  {
    path: 'kanji',
    canActivate: [AuthGuardService],
    loadChildren: async () => {
      const m = await import('./kanji/kanji-routing.module');
      return m.KanjiRoutingModule;
    },
  },
  {
    path: 'grammar',
    canActivate: [AuthGuardService],
    loadChildren: async () => {
      const m = await import('./grammar/grammar-routing.module');
      return m.GrammarRoutingModule;
    },
  },
  {
    path: 'collections',
    canActivate: [AuthGuardService],
    loadChildren: async () => {
      const m = await import('./collections/collections-routing.module');
      return m.CollectionsRoutingModule;
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class AppRoutingModule {}
