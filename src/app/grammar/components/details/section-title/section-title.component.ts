import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-clause-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss'],
  imports: [NgClass],
})
export class SectionTitleComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  isVisible: boolean;

  @Output()
  dropdownToggled: EventEmitter<any>;

  constructor() {
    this.title = '';
    this.isVisible = true;
    this.dropdownToggled = new EventEmitter<any>();
  }

  onClickDropdown() {
    this.dropdownToggled.emit();
  }

  ngOnInit(): void {}
}
