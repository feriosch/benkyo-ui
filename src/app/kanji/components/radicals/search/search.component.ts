import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { KanjiComponentService } from 'src/app/kanji/services/component.service';
import { KanjiRadicalService } from 'src/app/kanji/services/radicals.service';
import {
  KanjiComponentsResponse,
  KanjiRadicalsResponse,
} from 'src/models/kanji/components/responses.model';

@Component({
  selector: 'app-kanji-radicals-search',
  templateUrl: './search.component.html',
})
export class KanjiRadicalsSearchComponent implements OnInit {
  @ViewChild('autocomplete')
  autocomplete!: AutocompleteComponent;

  @Input()
  isComponentMode!: boolean;

  @Output()
  modeSwitched: EventEmitter<boolean>;

  @Output()
  componentSelected: EventEmitter<string>;

  suggestions: string[];

  isSuggestionLoading: boolean;

  constructor(
    private componentService: KanjiComponentService,
    private radicalService: KanjiRadicalService
  ) {
    this.modeSwitched = new EventEmitter<boolean>();
    this.componentSelected = new EventEmitter<string>();
    this.suggestions = [];
    this.isSuggestionLoading = false;
  }

  ngOnInit(): void {}

  switchMode(isComponentModeDesired: boolean): void {
    const componentSwitch: boolean =
      isComponentModeDesired && !this.isComponentMode;
    const radicalSwitch: boolean =
      !isComponentModeDesired && this.isComponentMode;
    if (componentSwitch || radicalSwitch) {
      this.suggestions = [];
      this.autocomplete.clear();
      this.modeSwitched.emit(true);
    }
  }

  getSuggestedComponents(prefix: string): void {
    this.isSuggestionLoading = true;
    this.componentService
      .getSuggestedComponents(prefix)
      .subscribe((response: KanjiComponentsResponse) => {
        this.isSuggestionLoading = false;
        this.suggestions = response.components;
      });
  }

  getSuggestedRadicals(prefix: string): void {
    this.isSuggestionLoading = true;
    this.radicalService
      .getSuggestedRadicals(prefix)
      .subscribe((response: KanjiRadicalsResponse) => {
        this.isSuggestionLoading = false;
        this.suggestions = response.radicals;
      });
  }

  onChangeSearch(text: string): void {
    if (text) {
      if (this.isComponentMode) {
        this.getSuggestedComponents(text);
      } else {
        this.getSuggestedRadicals(text);
      }
    } else {
      this.suggestions = [];
    }
  }

  onComponentSelected(component: string): void {
    this.componentSelected.emit(component);
    this.autocomplete.clear();
    this.suggestions = [];
  }
}
