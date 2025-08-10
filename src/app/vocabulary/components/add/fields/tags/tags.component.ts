import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TagsMapperService } from 'src/app/vocabulary/services/tags-mapper.service';

@Component({
  selector: 'app-add-word-form-tags-field',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class AddWordFormTagsFieldComponent implements OnInit {
  @Input()
  formGroup?: UntypedFormGroup;

  tags: string[];

  constructor(private tagsMapperService: TagsMapperService) {
    this.tags = [];
  }

  ngOnInit(): void {
    for (const [key] of Object.entries(this.formGroup!.controls)) {
      this.tags.push(key);
    }
  }

  getTagValue(tag: string): boolean {
    if (this.formGroup!.controls.hasOwnProperty(tag)) {
      return this.formGroup!.controls[tag].value;
    }
    return false;
  }

  getPrintingValue(tag: string): string {
    return this.tagsMapperService.getPrintingValueFromLocal(tag);
  }

  onClickTag(tag: string): void {
    if (this.formGroup!.controls.hasOwnProperty(tag)) {
      let control = this.formGroup!.controls[tag];
      control.setValue(!control.value);
    }
  }
}
