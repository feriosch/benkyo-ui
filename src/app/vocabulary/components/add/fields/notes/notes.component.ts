import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-word-form-notes-field',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class AddWordFormNotesFieldComponent implements OnInit {
  @Input()
  formGroup?: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
