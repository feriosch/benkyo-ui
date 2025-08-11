import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { TypeMapperService } from 'src/app/vocabulary/services/type-mapper.service';
import { VocabularyTypeForm } from 'src/models/vocabulary/forms/form.model';

@Component({
  selector: 'app-add-word-form-type-field',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss'],
})
export class AddWordFormTypeFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup<VocabularyTypeForm>;

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
    const subtype = name as keyof VocabularyTypeForm;
    if (this.formGroup!.controls.hasOwnProperty(subtype)) {
      const control: FormControl<number> = this.formGroup!.controls[
        subtype
      ] as FormControl<number>;

      return control.value;
    }
    return 0;
  }

  onClickSubtype(name: string): void {
    const subtype = name as keyof VocabularyTypeForm;
    if (this.formGroup!.controls.hasOwnProperty(subtype)) {
      const control: FormControl<number> = this.formGroup!.controls[
        subtype
      ] as FormControl<number>;
      control.setValue((control.value + 1) % 9);
    }
  }

  getMappedText(value: number, subtype: string): string {
    const subtypeName =
      this.typeMapperService.getPrintingValueFromLocal(subtype);
    return this.typeMapperService.getValueText(value, subtypeName);
  }
}
