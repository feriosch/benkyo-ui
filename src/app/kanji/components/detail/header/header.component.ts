import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-kanji-detail-header',
  templateUrl: './header.component.html',
})
export class KanjiDetailHeaderComponent implements OnInit {
  @Input()
  id!: string;

  @Input()
  v1!: number;

  @Input()
  isKanjiLoading!: boolean;

  @Output()
  clickPrevious: EventEmitter<any>;

  @Output()
  clickNext: EventEmitter<any>;

  constructor(private router: Router) {
    this.clickPrevious = new EventEmitter();
    this.clickNext = new EventEmitter();
  }

  get isFirstElement(): boolean {
    return this.v1 <= 1;
  }

  // TODO: Create endpoint for total kanji
  get isLastElement(): boolean {
    return this.v1 >= 2194;
  }

  ngOnInit(): void {}

  onClickPrevious(): void {
    this.clickPrevious.emit();
  }

  onClickNext(): void {
    this.clickNext.emit();
  }

  async onClickEdit(): Promise<void> {
    await this.router.navigate([`kanji/detail/${this.id}/edit`]);
  }
}
