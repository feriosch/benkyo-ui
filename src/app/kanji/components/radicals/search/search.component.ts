import { Component, OnInit } from '@angular/core';

import { KanjiComponentService } from 'src/app/kanji/services/component.service';
import { KanjiComponentsResponse } from 'src/models/kanji/components/responses.model';

@Component({
  selector: 'app-kanji-radicals-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class KanjiRadicalsSearchComponent implements OnInit {
  suggestedComponents: string[];

  constructor(private componentService: KanjiComponentService) {
    this.suggestedComponents = [];
  }

  ngOnInit(): void {}

  getSuggestedComponents(): void {
    this.componentService
      .getComponents()
      .subscribe((response: KanjiComponentsResponse | null) => {
        this.suggestedComponents = response!.components;
      });
  }

  onChangeSearch(search: string) {
    if (search) {
      this.componentService.prefix = search!;
      this.getSuggestedComponents();
    } else {
      this.suggestedComponents = [];
    }
  }
}
