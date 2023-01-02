import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

import { TagsMapperService } from '../../services/tags-mapper.service';

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.scss'],
})
export class AddTagsComponent implements OnInit {
  form?: FormGroup;
  tags: string[];

  constructor(
    private rootFormGroup: FormGroupDirective,
    private tagsMapperService: TagsMapperService
  ) {
    this.tags = [];
  }

  getTagValue(tag: string): boolean {
    if (this.form!.controls.hasOwnProperty(tag)) {
      return this.form!.controls[tag].value;
    }
    return false;
  }

  getPrintingValue(tag: string): string {
    return this.tagsMapperService.getPrintingValueFromLocal(tag);
  }

  onClickTag(tag: string): void {
    if (this.form!.controls.hasOwnProperty(tag)) {
      let control = this.form!.controls[tag];
      control.setValue(!control.value);
    }
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get('tags') as FormGroup;
    for (const [key] of Object.entries(this.form.controls)) {
      this.tags.push(key);
    }
  }
}
