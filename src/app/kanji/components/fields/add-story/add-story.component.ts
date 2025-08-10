import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-kanji-form-story-field',
  templateUrl: './add-story.component.html',
})
export class AddKanjiFormStoryFieldComponent implements OnInit {
  @Input()
  formGroup!: UntypedFormGroup;

  constructor() {}

  ngOnInit(): void {}
}
