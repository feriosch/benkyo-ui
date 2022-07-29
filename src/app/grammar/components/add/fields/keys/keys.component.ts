import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss'],
})
export class AddClauseFormKeysComponent implements OnInit {
  form?: FormGroup;
  keysFormArray?: FormArray;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control as FormGroup;
    this.keysFormArray = this.rootFormGroup.control.get('keys') as FormArray;
  }

  pushExample(): void {
    this.keysFormArray!.push(
      new FormGroup({
        sentence: new FormControl('', [Validators.required]),
        translation: new FormControl('', [Validators.required]),
      })
    );
  }

  popExample(): void {
    if (this.keysFormArray!.length > 0) {
      this.keysFormArray!.removeAt(this.keysFormArray!.length - 1);
    }
  }
}
