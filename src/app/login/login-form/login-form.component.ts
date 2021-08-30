import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { LoginResponse } from '../../../models/responses/login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.submitCredentials(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
      .subscribe(
        async (response: LoginResponse) => {
          localStorage.setItem('token', response.token);
          await this.router.navigate(['/vocabulary'])
        },
        (error) => {
          console.log(error)
        });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
  }

}
