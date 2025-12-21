import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from './components/forms/login/login-form.component';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AuthModule {}
