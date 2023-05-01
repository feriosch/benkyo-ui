import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { KanjiAddIrregularComponentBody } from 'src/models/kanji/components/irregular.model';
import { KanjiAddIrregularComponentResponse } from 'src/models/kanji/components/responses.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { AddIrregularComponentService } from 'src/app/kanji/services/forms/component.service';

@Component({
  selector: 'app-kanji-irregular-components-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class KanjiIrregularComponentsAddModalComponent implements OnInit {
  isOpen: boolean;
  form: FormGroup;

  constructor(
    private addService: AddIrregularComponentService,
    private notificationService: NotificationService
  ) {
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
    const addComponentBody: KanjiAddIrregularComponentBody =
      this.addService.transform(this.form.value);

    this.addService.postComponent(addComponentBody).subscribe(
      (_response: KanjiAddIrregularComponentResponse) => {
        this.form.reset();
        this.closeModal();
        this.addService.toastSuccess();
      },
      (error) => {
        this.notificationService.toastErrorNotification(error.error.error);
      }
    );
  }
}
