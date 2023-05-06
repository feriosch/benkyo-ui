import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-kanji-detail-radicals',
  templateUrl: './radicals.component.html',
})
export class KanjiDetailRadicalsComponent implements OnInit {
  @Input()
  components!: string[] | null;

  @Input()
  radicals!: string[];

  @Input()
  isRecursive!: boolean;

  @Input()
  story!: string | null;

  isComponentsSelected: boolean;

  constructor() {
    this.isComponentsSelected = true;
  }

  ngOnInit(): void {}

  onClickSwitch(): void {
    this.isComponentsSelected = !this.isComponentsSelected;
  }
}
