import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-kanji-radicals-tags',
  templateUrl: './tags.component.html',
})
export class KanjiRadicalsTagsComponent implements OnInit {
  @Input()
  components!: string[];

  @Output()
  componentDeselected: EventEmitter<number>;

  constructor() {
    this.componentDeselected = new EventEmitter<number>();
  }

  ngOnInit(): void {}

  onDeselectComponent(index: number): void {
    this.componentDeselected.emit(index);
  }
}
