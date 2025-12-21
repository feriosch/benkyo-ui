import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-kanji-detail-info',
  templateUrl: './info.component.html',
  standalone: false,
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
