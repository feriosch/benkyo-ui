import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss'],
})
export class AddClauseFormTypeComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  subtypes: string[];

  constructor() {
    this.subtypes = [];
  }

  getSubtypeValue(subtype: string): boolean {
    if (this.formGroup!.controls.hasOwnProperty(subtype)) {
      return this.formGroup!.controls[subtype].value;
    }
    return false;
  }

  onClickSubtype(subtype: string): void {
    if (this.formGroup!.controls.hasOwnProperty(subtype)) {
      let control = this.formGroup!.controls[subtype];
      control.setValue(!control.value);
    }
  }

  ngOnInit(): void {
    for (const [key] of Object.entries(this.formGroup!.controls)) {
      this.subtypes.push(key);
    }
  }
}
