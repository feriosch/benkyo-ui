import { Component, OnInit } from '@angular/core';

import { KanjiIrregularComponent } from 'src/models/kanji/components/irregular.model';
import { KanjiComponentService } from '../../services/component.service';
import { KanjiIrregularComponentsResponse } from 'src/models/kanji/components/responses.model';

@Component({
  selector: 'app-kanji-irregular-components-view',
  templateUrl: './irregular.component.html',
  styleUrls: ['./irregular.component.scss'],
})
export class KanjiIrregularComponentsViewComponent implements OnInit {
  components: KanjiIrregularComponent[];

  constructor(private componentService: KanjiComponentService) {
    this.components = [];
  }

  ngOnInit(): void {
    this.getComponents();
  }

  getComponents(): void {
    this.componentService
      .getIrregularComponents()
      .subscribe((response: KanjiIrregularComponentsResponse) => {
        this.components = response.components;
      });
  }
}
