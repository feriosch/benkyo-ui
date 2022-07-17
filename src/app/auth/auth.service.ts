import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { LoginResponse } from '../../models/responses/login';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isAuthenticated: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this._isAuthenticated = false;
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  submitCredentials(
    username: string,
    password: string
  ): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.backendUrl + '/login', {
      username: username,
      password: password,
    });
  }

  async login(token: string) {
    localStorage.setItem('token', token);
    await this.router.navigateByUrl('/vocabulary');
  }

  async logout() {
    localStorage.clear();
    this.isAuthenticated = false;
    await this.router.navigateByUrl('/login/signin');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  verifySession(): Observable<Object> {
    return this.http.get(environment.backendUrl + '/session');
  }
}
