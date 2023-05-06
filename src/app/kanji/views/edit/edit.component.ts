import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { FullKanji } from 'src/models/kanji/kanji.model';
import { UpdateRequest } from 'src/models/kanji/requests.model';
import { FormService } from 'src/app/shared/services/form.service';
import { KanjiService } from '../../services/kanji.service';
import { UpdateKanjiService } from '../../services/update.service';

@Component({
  selector: 'app-edit-kanji-view',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditKanjiViewComponent implements OnInit {
  id: string;
  isLoading: boolean;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private kanjiService: KanjiService,
    private updateService: UpdateKanjiService
  ) {
    // TODO: Async validity for repeated spanish
    this.id = this.route.snapshot.params['id'];
    this.isLoading = false;
    this.form = new FormGroup({
      v1: new FormControl(null, [Validators.required]),
      v2: new FormControl(null),
      on: new FormControl(null),
      kanji: new FormControl(null, [Validators.required]),
      kun: new FormControl(null),
      spanish: new FormControl(null, [Validators.required]),
      components: new FormArray([]),
      story: new FormControl(null),
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
    this.formService.getControl<FormControl>(this.form, 'v1').setValue(info.v1);
    this.formService.getControl<FormControl>(this.form, 'v2').setValue(info.v2);
    this.formService
      .getControl<FormControl>(this.form, 'kanji')
      .setValue(info.kanji);
    this.formService.getControl<FormControl>(this.form, 'on').setValue(info.on);
    this.formService
      .getControl<FormControl>(this.form, 'kun')
      .setValue(info.kun);
    this.formService
      .getControl<FormControl>(this.form, 'spanish')
      .setValue(info.spanish);
    this.formService
      .getControl<FormControl>(this.form, 'story')
      .setValue(info.story);

    info.components?.forEach((component: string) => {
      this.formService
        .getControl<FormArray>(this.form, 'components')
        .push(new FormControl(component, [Validators.required]));
    });
  }

  onSubmit(): void {
    const requestBody: UpdateRequest = this.updateService.getUpdateRequestBody(
      this.id,
      this.form
    );
    this.updateService.updateWord(requestBody).subscribe(
      async (_response) => {
        await this.router.navigate(['../'], { relativeTo: this.route });
        console.log(_response);
      },
      (error) => {
        console.log(error.error.error);
      }
    );
  }
}
