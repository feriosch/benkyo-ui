import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-kanji-view',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditKanjiViewComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  async onClickCancel() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }
}
