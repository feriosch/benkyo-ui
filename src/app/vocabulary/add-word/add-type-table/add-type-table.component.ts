import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

import { TypeMapperService } from '../../services/type-mapper.service';

@Component({
  selector: 'app-add-type-table',
  templateUrl: './add-type-table.component.html',
  styleUrls: ['./add-type-table.component.scss'],
})
export class AddTypeTableComponent implements OnInit {
  form?: FormGroup;
  subTypes: string[];

  constructor(
    private rootFormGroup: FormGroupDirective,
    private typeMapperService: TypeMapperService
  ) {
    this.subTypes = [];
  }

  getCellValue(name: string): number {
    if (this.form!.controls.hasOwnProperty(name)) {
      return this.form!.controls[name].value;
    }
    return 0;
  }

  onClickCell(cell: string) {
    if (this.form!.controls.hasOwnProperty(cell)) {
      let control = this.form!.controls[cell];
      control.setValue((control.value + 1) % 9);
    }
  }

  getValueText(value: number, subtype: string): string {
    let subtypeName = this.typeMapperService.getPrintingValueFromLocal(subtype);
    return this.typeMapperService.getValueText(value, subtypeName);
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get('type') as FormGroup;
    for (const [key] of Object.entries(this.form.controls)) {
      this.subTypes.push(key);
    }
  }
}
