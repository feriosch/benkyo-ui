import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    return firstValueFrom(this.authService.verifySession())
      .then(async () => {
        this.authService.isAuthenticated = true;
        return true;
      })
      .catch(async () => {
        await this.authService.logout();
        return false;
      });
  }
}
