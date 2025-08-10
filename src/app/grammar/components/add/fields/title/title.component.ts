import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class AddClauseFormTitleComponent implements OnInit {
  @Input()
  formGroup?: UntypedFormGroup;

  constructor() {}

  get titleControl() {
    return this.formGroup!.get('title');
  }

  get hiraganaControl() {
    return this.formGroup!.get('hiragana');
  }

  get translationControl() {
    return this.formGroup!.get('translation');
  }

  ngOnInit(): void {}
}
