import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class LoginGuardService {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    return firstValueFrom(this.authService.verifySession())
      .then(async () => {
        this.authService.isAuthenticated = true;
        await this.router.navigate(['/vocabulary']);
        return false;
      })
      .catch(async () => {
        return true;
      });
  }
}
