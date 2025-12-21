import { Routes } from '@angular/router';

import { AuthGuardService } from './auth/services/auth-guard.service';
import { LoginGuardService } from './auth/services/login-guard.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/vocabulary',
  },
  {
    path: 'login',
    canActivate: [LoginGuardService],
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'vocabulary',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./vocabulary/vocabulary.routes').then((m) => m.vocabularyRoutes),
  },
  {
    path: 'collections',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./collections/collections.routes').then(
        (m) => m.collectionsRoutes,
      ),
  },
  {
    path: 'kanji',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./kanji/kanji.routes').then((m) => m.kanjiRoutes),
  },
  {
    path: 'grammar',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./grammar/grammar.routes').then((m) => m.grammarRoutes),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

