import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginResponse } from 'src/models/responses/login';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService
      .submitCredentials(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe(
        async (response: LoginResponse) => {
          await this.authService.login(response.token);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
}
