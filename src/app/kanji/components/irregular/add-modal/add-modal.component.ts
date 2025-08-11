import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { KanjiAddIrregularComponentBody } from 'src/models/kanji/components/irregular.model';
import { KanjiAddIrregularComponentResponse } from 'src/models/kanji/components/responses.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AddIrregularComponentService } from 'src/app/kanji/services/forms/component.service';
import { IrregularComponentForm } from 'src/models/kanji/forms/form.model';

@Component({
  selector: 'app-kanji-irregular-components-add-modal',
  templateUrl: './add-modal.component.html',
})
export class KanjiIrregularComponentsAddModalComponent implements OnInit {
  form: FormGroup<IrregularComponentForm>;
  isOpen: boolean;
  isSubmitting: boolean;

  @Output()
  componentAdded: EventEmitter<null>;

  constructor(
    private addService: AddIrregularComponentService,
    private notificationService: NotificationService,
  ) {
    this.form = new FormGroup<IrregularComponentForm>({
      component: new FormControl<string | null>(null, [Validators.required]),
      radicals: new FormArray<FormControl<string | null>>([]),
    });
    this.radicalsArray.push(
      new FormControl<string | null>(null, [Validators.required]),
    );
    for (let i = 0; i < 5; i++) {
      this.radicalsArray.push(new FormControl<string | null>(null));
    }
    this.isOpen = false;
    this.isSubmitting = false;
    this.componentAdded = new EventEmitter();
  }

  get componentControl(): FormControl<string | null> {
    return this.form.get('component') as FormControl<string | null>;
  }

  get isComponentControlInvalid(): boolean {
    return this.componentControl.touched && this.componentControl.invalid;
  }

  get radicalsArray(): FormArray<FormControl<string | null>> {
    return this.form.get('radicals') as FormArray<FormControl<string | null>>;
  }

  ngOnInit(): void {}

  openModal(): void {
    this.isOpen = true;
  }

  closeModal(): void {
    this.isOpen = false;
  }

  onSubmit(): void {
    this.isSubmitting = true;
    const addComponentBody: KanjiAddIrregularComponentBody =
      this.addService.transform(this.form.value);

    this.addService.postComponent(addComponentBody).subscribe(
      (_response: KanjiAddIrregularComponentResponse) => {
        this.form.reset();
        this.closeModal();
        this.componentAdded.emit();
        this.notificationService.toastSuccess(
          `Irregular component created successfully!`,
        );
      },
      (error) => this.notificationService.toastError(error.error.error),
      () => (this.isSubmitting = false),
    );
  }
}
