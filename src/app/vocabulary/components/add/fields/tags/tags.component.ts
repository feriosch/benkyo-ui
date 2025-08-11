import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { TagsMapperService } from 'src/app/vocabulary/services/tags-mapper.service';
import { VocabularyTagsForm } from 'src/models/vocabulary/forms/form.model';

@Component({
  selector: 'app-add-word-form-tags-field',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class AddWordFormTagsFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup<VocabularyTagsForm>;

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
      const control: FormControl<boolean> = this.formGroup!.controls[
        tag as keyof VocabularyTagsForm
      ] as FormControl<boolean>;
      return control.value;
    }
    return false;
  }

  getPrintingValue(tag: string): string {
    return this.tagsMapperService.getPrintingValueFromLocal(tag);
  }

  onClickTag(tag: string): void {
    if (this.formGroup!.controls.hasOwnProperty(tag)) {
      let control: FormControl<boolean> = this.formGroup!.controls[
        tag as keyof VocabularyTagsForm
      ] as FormControl<boolean>;
      control.setValue(!control.value);
    }
  }
}
