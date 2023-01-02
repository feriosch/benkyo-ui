import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginFormComponent } from './components/forms/login/login-form.component';

const routes: Routes = [
  {
    path: 'signin',
    pathMatch: 'full',
    component: LoginFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
