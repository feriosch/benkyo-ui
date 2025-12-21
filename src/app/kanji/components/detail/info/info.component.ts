import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-kanji-detail-info',
  templateUrl: './info.component.html',
  imports: [NgIf],
})
export class KanjiDetailInfoComponent implements OnInit {
  @Input()
  kanji!: string;

  @Input()
  spanish!: string;

  @Input()
  on!: string | null;

  @Input()
  kun!: string | null;

  ngOnInit(): void {}
}
