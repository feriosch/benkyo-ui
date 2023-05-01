import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kanji-irregular-components-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class KanjiIrregularComponentsAddModalComponent implements OnInit {
  isOpen: boolean;
  form: FormGroup;

  constructor() {
    this.isOpen = false;
    this.form = new FormGroup({
      component: new FormControl(null, [Validators.required]),
      radicals: new FormArray([]),
    });
    this.radicalsArray.push(new FormControl(null, [Validators.required]));
    for (let i = 0; i < 5; i++) {
      this.radicalsArray.push(new FormControl(null));
    }
  }

  get componentControl(): FormControl {
    return this.form.get('component') as FormControl;
  }

  get isComponentControlInvalid(): boolean {
    return this.componentControl.touched && this.componentControl.invalid;
  }

  get radicalsArray(): FormArray {
    return this.form.get('radicals') as FormArray;
  }

  ngOnInit(): void {}

  openModal(): void {
    this.isOpen = true;
  }

  closeModal(): void {
    this.isOpen = false;
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
