import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { LoginResponse } from '../../models/responses/login';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor (private http: HttpClient) { }

  submitCredentials(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.backendUrl + '/login', {
      username: username,
      password: password
    });
  }

  verifySession(): Promise<Object> {
    return this.http.get(environment.backendUrl + '/session').toPromise();
  }
}
