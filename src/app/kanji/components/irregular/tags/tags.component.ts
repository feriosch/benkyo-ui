import { Component, Input, OnInit } from '@angular/core';
import { KanjiIrregularComponent } from 'src/models/kanji/components/irregular.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-kanji-irregular-components-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  imports: [NgFor, NgIf],
})
export class KanjiIrregularComponentsTagsComponent implements OnInit {
  @Input()
  components!: KanjiIrregularComponent[];

  selectedComponent: KanjiIrregularComponent | null;

  constructor() {
    this.selectedComponent = null;
  }

  ngOnInit(): void {}

  selectComponent(component: KanjiIrregularComponent): void {
    this.selectedComponent = component;
  }
}
