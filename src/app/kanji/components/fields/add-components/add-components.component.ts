import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { KanjiComponentsResponse } from 'src/models/kanji/components/responses.model';
import { FormService } from 'src/app/shared/services/form.service';
import { KanjiComponentService } from 'src/app/kanji/services/component.service';

@Component({
  selector: 'app-add-kanji-form-components-field',
  templateUrl: './add-components.component.html',
})
export class AddKanjiFormComponentsFieldComponent implements OnInit {
  @ViewChild('autocomplete')
  autocomplete!: AutocompleteComponent;

  @Input()
  form!: FormGroup;

  suggestions: string[];

  isSuggestionLoading: boolean;

  constructor(
    private formService: FormService,
    private componentService: KanjiComponentService
  ) {
    this.suggestions = [];
    this.isSuggestionLoading = false;
  }

  get formArray(): FormArray {
    return this.formService.getControl<FormArray>(this.form, 'components');
  }

  get components(): string[] {
    return this.formService.getValue<string[]>(this.form, 'components');
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
