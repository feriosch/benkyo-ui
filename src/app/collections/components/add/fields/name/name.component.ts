import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-collection-form-name-field',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class AddCollectionFormNameFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  isControlInvalid(name: string): boolean {
    const control: FormControl = this.formGroup!.get(name) as FormControl;
    return control.touched && control.invalid;
  }
}
