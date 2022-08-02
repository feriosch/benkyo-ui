import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class AddClauseFormTagsComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  tags: string[];

  constructor() {
    this.tags = [];
  }

  getTagValue(tag: string): boolean {
    if (this.formGroup!.controls.hasOwnProperty(tag)) {
      return this.formGroup!.controls[tag].value;
    }
    return false;
  }

  onClickTag(tag: string): void {
    if (this.formGroup!.controls.hasOwnProperty(tag)) {
      let control = this.formGroup!.controls[tag];
      control.setValue(!control.value);
    }
  }

  ngOnInit(): void {
    for (const [key] of Object.entries(this.formGroup!.controls)) {
      this.tags.push(key);
    }
  }
}
