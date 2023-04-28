import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { KanjiComponentService } from 'src/app/kanji/services/component.service';
import { KanjiComponentsResponse } from 'src/models/kanji/components/responses.model';

@Component({
  selector: 'app-kanji-radicals-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class KanjiRadicalsSearchComponent implements OnInit {
  @ViewChild('autocomplete')
  autocomplete: AutocompleteComponent | undefined;

  @Output()
  componentSelected: EventEmitter<string>;

  suggestedComponents: string[];

  isSuggestionLoading: boolean;

  constructor(private componentService: KanjiComponentService) {
    this.componentSelected = new EventEmitter<string>();
    this.suggestedComponents = [];
    this.isSuggestionLoading = false;
  }

  ngOnInit(): void {}

  getSuggestedComponents(): void {
    this.isSuggestionLoading = true;
    this.componentService
      .getComponents()
      .subscribe((response: KanjiComponentsResponse | null) => {
        this.isSuggestionLoading = false;
        this.suggestedComponents = response!.components;
      });
  }

  onChangeSearch(search: string): void {
    if (search) {
      this.componentService.prefix = search!;
      this.getSuggestedComponents();
    } else {
      this.suggestedComponents = [];
    }
  }

  onComponentSelected(component: string): void {
    this.componentSelected.emit(component);
    this.autocomplete!.clear();
    this.suggestedComponents = [];
  }
}
