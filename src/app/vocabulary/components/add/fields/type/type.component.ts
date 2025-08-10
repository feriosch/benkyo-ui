import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TypeMapperService } from 'src/app/vocabulary/services/type-mapper.service';

@Component({
  selector: 'app-add-word-form-type-field',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss'],
})
export class AddWordFormTypeFieldComponent implements OnInit {
  @Input()
  formGroup?: UntypedFormGroup;

  subtypes: string[];

  constructor(private typeMapperService: TypeMapperService) {
    this.subtypes = [];
  }

  ngOnInit(): void {
    for (const [key] of Object.entries(this.formGroup!.controls)) {
      this.subtypes.push(key);
    }
  }

  getSubtypeValue(name: string): number {
    if (this.formGroup!.controls.hasOwnProperty(name)) {
      return this.formGroup!.controls[name].value;
    }
    return 0;
  }

  onClickSubtype(subtype: string): void {
    if (this.formGroup!.controls.hasOwnProperty(subtype)) {
      let control = this.formGroup!.controls[subtype];
      control.setValue((control.value + 1) % 9);
    }
  }

  getMappedText(value: number, subtype: string): string {
    let subtypeName = this.typeMapperService.getPrintingValueFromLocal(subtype);
    return this.typeMapperService.getValueText(value, subtypeName);
  }
}
