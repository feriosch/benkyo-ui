import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  async onClickVocabulary() {
    await this.router.navigateByUrl('/vocabulary');
  }

  async onClickAddWord() {
    await this.router.navigateByUrl('/vocabulary/add');
  }

  async onClickKanji() {
    await this.router.navigateByUrl('/kanji');
  }

  async onClickAddKanji() {
    await this.router.navigateByUrl('/kanji/add');
  }

  async onClickGrammar() {
    await this.router.navigateByUrl('/grammar');
  }

  async onClickAddClause() {
    await this.router.navigateByUrl('/grammar/add');
  }

  async onClickLogout() {
    await this.authService.logout();
  }

  ngOnInit(): void {}
}
