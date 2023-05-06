import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  Form,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { KanjiComponentsResponse } from 'src/models/kanji/components/responses.model';
import { getControl, getValue } from 'src/app/shared/form';
import { KanjiComponentService } from 'src/app/kanji/services/component.service';

@Component({
  selector: 'app-add-kanji-form-components-field',
  templateUrl: './add-components.component.html',
  styleUrls: ['./add-components.component.scss'],
})
export class AddKanjiFormComponentsFieldComponent implements OnInit {
  @ViewChild('autocomplete')
  autocomplete!: AutocompleteComponent;

  @Input()
  form!: FormGroup;

  suggestions: string[];

  isSuggestionLoading: boolean;

  constructor(private componentService: KanjiComponentService) {
    this.suggestions = [];
    this.isSuggestionLoading = false;
  }

  get formArray(): FormArray {
    return getControl<FormArray>(this.form, 'components');
  }

  get components(): string[] {
    return getValue<string[]>(this.form, 'components');
  }

  ngOnInit(): void {}

  getSuggestions(prefix: string): void {
    this.isSuggestionLoading = true;
    this.componentService
      .getSuggestedComponents(prefix)
      .subscribe((response: KanjiComponentsResponse) => {
        this.isSuggestionLoading = false;
        this.suggestions = response.components;
      });
  }

  onChangeSearch(text: string): void {
    if (text) this.getSuggestions(text);
    else this.suggestions = [];
  }

  onAddComponent(component: string): void {
    this.formArray.push(new FormControl(component, [Validators.required]));
    this.autocomplete.clear();
    this.suggestions = [];
  }

  onDeleteComponent(index: number): void {
    this.formArray.removeAt(index);
  }
}
