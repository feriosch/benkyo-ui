import { Component, OnInit, ViewChild } from '@angular/core';

import { KanjiIrregularComponent } from 'src/models/kanji/components/irregular.model';
import { KanjiIrregularComponentsResponse } from 'src/models/kanji/components/responses.model';
import { KanjiComponentService } from '../../services/component.service';
import { KanjiIrregularComponentsAddModalComponent } from '../../components/irregular/add-modal/add-modal.component';

@Component({
  selector: 'app-kanji-irregular-components-view',
  templateUrl: './irregular.component.html',
  styleUrls: ['./irregular.component.scss'],
})
export class KanjiIrregularComponentsViewComponent implements OnInit {
  @ViewChild('addModal')
  addModal!: KanjiIrregularComponentsAddModalComponent;

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

  onClickAddComponent(): void {
    this.addModal.openModal();
  }
}
