import { Component, Input, OnInit } from '@angular/core';

import { TagsMapperService } from '../../../services/tags-mapper.service';

@Component({
  selector: 'app-word-details-tags',
  templateUrl: './tags.component.html',
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
