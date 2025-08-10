import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginResponse } from 'src/models/responses/login';
import { AuthService } from 'src/app/auth/services/auth.service';

// Define the form structure with proper control types
interface LoginForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup<LoginForm>;

  constructor(private authService: AuthService) {}

  onSubmit() {
    // Now TypeScript knows the exact structure
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    
    // Add type safety checks
    if (username && password) {
      this.authService
        .submitCredentials(username, password)
        .subscribe(
          async (response: LoginResponse) => {
            await this.authService.login(response.token);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup<LoginForm>({
      username: new FormControl<string | null>(null, [Validators.required]),
      password: new FormControl<string | null>(null, [Validators.required]),
    });
  }
}
