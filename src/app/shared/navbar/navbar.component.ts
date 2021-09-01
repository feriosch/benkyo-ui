import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  async onClickLogout() {
    await this.authService.logout();
  }

  ngOnInit(): void { }

}
