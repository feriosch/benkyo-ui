import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-kanji-detail-radicals',
  templateUrl: './radicals.component.html',
  styleUrls: ['./radicals.component.scss'],
})
export class KanjiDetailRadicalsComponent implements OnInit {
  @Input()
  components: string[] | null;

  @Input()
  radicals: string[];

  @Input()
  isRecursive: boolean;

  @Input()
  story: string | null;

  isComponentsSelected: boolean;

  constructor() {
    this.components = null;
    this.radicals = [];
    this.isRecursive = false;
    this.story = null;
    this.isComponentsSelected = true;
  }

  ngOnInit(): void {}

  onClickSwitch(): void {
    this.isComponentsSelected = !this.isComponentsSelected;
  }
}
