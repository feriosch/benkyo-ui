import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class AddClauseFormTitleComponent implements OnInit {
  form?: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  get titleControl() {
    return this.form!.get('title');
  }

  get hiraganaControl() {
    return this.form!.get('hiragana');
  }

  get translationControl() {
    return this.form!.get('translation')
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control as FormGroup;
  }
}
