import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class AddClauseFormTagsComponent implements OnInit {
  form?: FormGroup;
  tags: string[];

  constructor(private rootFormGroup: FormGroupDirective) {
    this.tags = [];
  }

  getTagValue(tag: string): boolean {
    if (this.form!.controls.hasOwnProperty(tag)) {
      return this.form!.controls[tag].value;
    }
    return false;
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
