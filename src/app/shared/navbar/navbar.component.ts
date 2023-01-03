import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  async navigateTo(route: string) {
    await this.router.navigateByUrl(route);
  }

  async logout() {
    await this.authService.logout();
  }
}
