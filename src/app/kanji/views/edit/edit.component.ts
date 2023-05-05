import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { FullKanji } from 'src/models/kanji/kanji.model';
import { KanjiService } from '../../services/kanji.service';

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
    private kanjiService: KanjiService
  ) {
    // TODO: Async validity for repeated spanish
    this.id = this.route.snapshot.params['id'];
    this.isLoading = false;
    this.form = new FormGroup({
      v2: new FormControl(null),
      on: new FormControl(null),
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

  get componentsFormArray(): FormArray {
    return this.form.get('components')! as FormArray;
  }

  getFormControl(control: string): FormControl {
    return this.form.get(control) as FormControl;
  }

  async onClickCancel() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  initializeControls(info: FullKanji): void {
    this.getFormControl('v2').setValue(info.v2);
    this.getFormControl('on').setValue(info.on);
    this.getFormControl('kun').setValue(info.kun);
    this.getFormControl('spanish').setValue(info.spanish);
    this.getFormControl('story').setValue(info.story);

    info.components?.forEach((component: string) => {
      this.componentsFormArray.push(
        new FormControl(component, [Validators.required])
      );
    });
  }

  onSubmit(): void {
    console.log(this.form);
  }
}
