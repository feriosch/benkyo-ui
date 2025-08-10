import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { FullKanji } from 'src/models/kanji/kanji.model';
import { UpdateRequest } from 'src/models/kanji/requests.model';
import { FormService } from 'src/app/shared/services/form.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { KanjiService } from '../../services/kanji.service';
import { UpdateKanjiService } from '../../services/update.service';

@Component({
  selector: 'app-edit-kanji-view',
  templateUrl: './edit.component.html',
})
export class EditKanjiViewComponent implements OnInit {
  id: string;
  isLoading: boolean;
  form: UntypedFormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private notificationService: NotificationService,
    private kanjiService: KanjiService,
    private updateService: UpdateKanjiService
  ) {
    // TODO: Async validity for repeated spanish
    this.id = this.route.snapshot.params['id'];
    this.isLoading = false;
    this.form = new UntypedFormGroup({
      v1: new UntypedFormControl(null, [Validators.required]),
      v2: new UntypedFormControl(null),
      on: new UntypedFormControl(null),
      kanji: new UntypedFormControl(null, [Validators.required]),
      kun: new UntypedFormControl(null),
      spanish: new UntypedFormControl(null, [Validators.required]),
      components: new UntypedFormArray([]),
      story: new UntypedFormControl(null),
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.kanjiService.getKanjiById(this.id).subscribe((response: FullKanji) => {
      this.isLoading = false;
      this.initializeControls(response);
    });
  }

  initializeControls(info: FullKanji): void {
    this.formService.getControl<UntypedFormControl>(this.form, 'v1').setValue(info.v1);
    this.formService.getControl<UntypedFormControl>(this.form, 'v2').setValue(info.v2);
    this.formService
      .getControl<UntypedFormControl>(this.form, 'kanji')
      .setValue(info.kanji);
    this.formService.getControl<UntypedFormControl>(this.form, 'on').setValue(info.on);
    this.formService
      .getControl<UntypedFormControl>(this.form, 'kun')
      .setValue(info.kun);
    this.formService
      .getControl<UntypedFormControl>(this.form, 'spanish')
      .setValue(info.spanish);
    this.formService
      .getControl<UntypedFormControl>(this.form, 'story')
      .setValue(info.story);

    info.components?.forEach((component: string) => {
      this.formService
        .getControl<UntypedFormArray>(this.form, 'components')
        .push(new UntypedFormControl(component, [Validators.required]));
    });
  }

  onSubmit(): void {
    const requestBody: UpdateRequest = this.updateService.getUpdateRequestBody(
      this.id,
      this.form
    );
    this.isLoading = true;
    this.updateService.updateWord(requestBody).subscribe(
      async (_response: boolean) => {
        await this.router.navigate(['../'], { relativeTo: this.route });
        this.notificationService.toastSuccess(
          `Kanji ${this.id} succesfully edited.`
        );
      },
      (error) => {
        console.log(error.error.error);
        this.notificationService.toastError(error.error.error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
