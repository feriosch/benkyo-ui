import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-clause-form-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class AddClauseFormSectionComponent implements OnInit {
  @Input()
  control?: AbstractControl;

  formGroup?: FormGroup;
  explanationControl?: FormControl;
  examplesArray?: FormArray;

  constructor() {}

  ngOnInit(): void {
    this.formGroup = this.control! as FormGroup;
    this.explanationControl = this.control!.get('explanation') as FormControl;
    this.examplesArray = this.control!.get('examples') as FormArray;
  }

  pushExample(): void {
    this.examplesArray!.push(
      new FormGroup({
        sentence: new FormControl('', [Validators.required]),
        translation: new FormControl('', [Validators.required]),
      })
    );
  }

  popExample(): void {
    if (this.examplesArray!.length > 0) {
      this.examplesArray!.removeAt(this.examplesArray!.length - 1);
    }
  }
}
