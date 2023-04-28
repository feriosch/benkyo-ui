import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kanji-radicals-view',
  templateUrl: './radicals.component.html',
  styleUrls: ['./radicals.component.scss'],
})
export class KanjiRadicalsViewComponent implements OnInit {
  selectedComponents: string[];

  constructor() {
    this.selectedComponents = [];
  }

  ngOnInit(): void {}

  addComponent(component: string): void {
    this.selectedComponents.push(component);
  }
}
