import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuardService } from './auth/auth-guard.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { LoginGuardService } from './auth/login-guard.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes= [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/vocabulary',
  },
  {
    path: 'login',
    canActivate: [LoginGuardService],
    loadChildren: async () => {
      const m = await import('./login/login-routing.module');
      return m.LoginRoutingModule;
    }
  },
  {
    path: 'vocabulary',
    canActivate: [AuthGuardService],
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
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class AppRoutingModule { }
