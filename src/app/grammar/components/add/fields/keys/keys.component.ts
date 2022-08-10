import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss'],
})
export class AddClauseFormKeysComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  @Input()
  formArray?: FormArray;

  constructor() {}

  ngOnInit(): void {}

  pushExample(): void {
    this.formArray!.push(
      new FormGroup({
        sentence: new FormControl(null, [Validators.required]),
        translation: new FormControl(null, [Validators.required]),
      })
    );
  }

  popExample(): void {
    if (this.formArray!.length > 0)
      this.formArray!.removeAt(this.formArray!.length - 1);
  }
}
