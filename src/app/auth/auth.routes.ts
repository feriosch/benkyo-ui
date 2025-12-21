import { Routes } from '@angular/router';

import { LoginFormComponent } from './components/forms/login/login-form.component';

export const authRoutes: Routes = [
  {
    path: 'signin',
    pathMatch: 'full',
    component: LoginFormComponent,
  },
];

