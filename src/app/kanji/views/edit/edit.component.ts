import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { FullKanji } from 'src/models/kanji/kanji.model';
import { getControl } from 'src/app/shared/form';
import { KanjiService } from '../../services/kanji.service';
import { UpdateKanjiService } from '../../services/update.service';
import { UpdateRequest } from 'src/models/kanji/requests.model';

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
    getControl<FormControl>(this.form, 'v1').setValue(info.v1);
    getControl<FormControl>(this.form, 'v2').setValue(info.v2);
    getControl<FormControl>(this.form, 'kanji').setValue(info.kanji);
    getControl<FormControl>(this.form, 'on').setValue(info.on);
    getControl<FormControl>(this.form, 'kun').setValue(info.kun);
    getControl<FormControl>(this.form, 'spanish').setValue(info.spanish);
    getControl<FormControl>(this.form, 'story').setValue(info.story);

    info.components?.forEach((component: string) => {
      getControl<FormArray>(this.form, 'components').push(
        new FormControl(component, [Validators.required])
      );
    });
  }

  onSubmit(): void {
    const requestBody: UpdateRequest = this.updateService.getUpdateRequestBody(
      this.id,
      this.form
    );
    console.log(requestBody);
  }
}
