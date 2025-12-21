import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KanjiMainForm } from 'src/models/kanji/forms/form.model';

@Component({
  selector: 'app-add-kanji-form-story-field',
  templateUrl: './add-story.component.html',
  imports: [FormsModule, ReactiveFormsModule],
})
export class AddKanjiFormStoryFieldComponent implements OnInit {
  @Input()
  formGroup!: FormGroup<KanjiMainForm>;

  constructor() {}

  ngOnInit(): void {}
}
