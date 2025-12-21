import { Component, Input, OnInit } from '@angular/core';

import { TagsMapperService } from '../../../services/tags-mapper.service';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-word-details-tags',
  templateUrl: './tags.component.html',
  imports: [NgFor, NgClass],
})
export class WordDetailsTagsComponent implements OnInit {
  @Input()
  tags!: string[];

  constructor(private tagMapperService: TagsMapperService) {}

  ngOnInit(): void {}

  getTagValueText(tag: string): string {
    return this.tagMapperService.getPrintingValueFromBackend(tag);
  }
}
