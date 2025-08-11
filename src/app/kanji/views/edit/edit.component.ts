import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { FullKanji } from 'src/models/kanji/kanji.model';
import { UpdateRequest } from 'src/models/kanji/requests.model';
import { KanjiMainForm } from 'src/models/kanji/forms/form.model';
import { FormService } from 'src/app/shared/services/form.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { KanjiService } from '../../services/kanji.service';
import { UpdateKanjiService } from '../../services/update.service';
import { KanjiFormService } from '../../services/forms/form.service';

@Component({
  selector: 'app-edit-kanji-view',
  templateUrl: './edit.component.html',
})
export class EditKanjiViewComponent implements OnInit {
  id: string;
  isLoading: boolean;
  form: FormGroup<KanjiMainForm>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private notificationService: NotificationService,
    private kanjiService: KanjiService,
    private updateService: UpdateKanjiService,
    private kanjiFormService: KanjiFormService,
  ) {
    // TODO: Async validity for repeated spanish
    this.id = this.route.snapshot.params['id'];
    this.isLoading = false;
    this.form = this.kanjiFormService.createNewForm();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.kanjiService.getKanjiById(this.id).subscribe((response: FullKanji) => {
      this.isLoading = false;
      this.initializeControls(response);
      this.kanjiFormService.initializeForm(this.form);
    });
  }

  initializeControls(info: FullKanji): void {
    this.formService
      .getControl<FormControl<number | null>>(this.form, 'v1')
      .setValue(info.v1);
    this.formService
      .getControl<FormControl<number | null>>(this.form, 'v2')
      .setValue(info.v2);
    this.formService
      .getControl<FormControl<string | null>>(this.form, 'kanji')
      .setValue(info.kanji);
    this.formService
      .getControl<FormControl<string | null>>(this.form, 'on')
      .setValue(info.on);
    this.formService
      .getControl<FormControl<string | null>>(this.form, 'kun')
      .setValue(info.kun);
    this.formService
      .getControl<FormControl<string | null>>(this.form, 'spanish')
      .setValue(info.spanish);
    this.formService
      .getControl<FormControl<string | null>>(this.form, 'story')
      .setValue(info.story);

    info.components?.forEach((component: string) => {
      this.formService
        .getControl<FormArray>(this.form, 'components')
        .push(new FormControl<string | null>(component, [Validators.required]));
    });
  }

  onSubmit(): void {
    const requestBody: UpdateRequest = this.updateService.getUpdateRequestBody(
      this.id,
      this.form,
    );
    this.isLoading = true;
    this.updateService.updateWord(requestBody).subscribe(
      async (_response: boolean) => {
        await this.router.navigate(['../'], { relativeTo: this.route });
        this.notificationService.toastSuccess(
          `Kanji ${this.id} successfully edited.`,
        );
      },
      (error) => {
        console.log(error.error.error);
        this.notificationService.toastError(error.error.error);
      },
      () => {
        this.isLoading = false;
      },
    );
  }
}
