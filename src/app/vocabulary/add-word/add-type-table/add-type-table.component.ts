import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-add-type-table',
  templateUrl: './add-type-table.component.html',
  styleUrls: ['./add-type-table.component.scss']
})
export class AddTypeTableComponent implements OnInit {

  @Input() formGroupName?: string;
  form?: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) { }

  getCellValue(name: string): number {
    if (this.form!.controls.hasOwnProperty(name)) {
      return this.form!.controls[name].value;
    }
    return 0;
  }

  getMappedValue(value: number, defaultName: string): string {
    switch (value) {
      case 0:
      case 1: return defaultName;
      case 2: return 'si';
      default: return defaultName;
    }
  }

  onClickCell(cell: string) {
    if (this.form!.controls.hasOwnProperty(cell)) {
      let control = this.form!.controls[cell];
      control.setValue((control.value + 1) % 10)
    }
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName!) as FormGroup;
    console.log(this.form)
  }

}
