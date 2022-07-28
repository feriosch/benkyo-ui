import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss'],
})
export class AddClauseFormTypeComponent implements OnInit {
  form?: FormGroup;
  subtypes: string[];

  constructor(private rootFormGroup: FormGroupDirective) {
    this.subtypes = [];
  }

  getSubtypeValue(subtype: string): boolean {
    if (this.form!.controls.hasOwnProperty(subtype)) {
      return this.form!.controls[subtype].value;
    }
    return false;
  }

  onClickSubtype(subtype: string): void {
    if (this.form!.controls.hasOwnProperty(subtype)) {
      let control = this.form!.controls[subtype];
      control.setValue(!control.value);
    }
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get('type') as FormGroup;
    for (const [key] of Object.entries(this.form.controls)) {
      this.subtypes.push(key);
    }
  }
}
