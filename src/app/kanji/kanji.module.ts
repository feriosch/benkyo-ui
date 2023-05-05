import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { KanjiHomeViewComponent } from './views/home/home.component';
import { KanjiDetailViewComponent } from './views/detail/detail.component';
import { KanjiRadicalsViewComponent } from './views/radicals/radicals.component';
import { EditKanjiViewComponent } from './views/edit/edit.component';
import { KanjiIrregularComponentsViewComponent } from './views/irregular/irregular.component';
import { KanjiHomeTableComponent } from './components/home/table/table.component';
import { KanjiDetailInfoComponent } from './components/detail/info/info.component';
import { KanjiDetailRadicalsComponent } from './components/detail/radicals/radicals.component';
import { KanjiRadicalsSearchComponent } from './components/radicals/search/search.component';
import { KanjiRadicalsTagsComponent } from './components/radicals/tags/tags.component';
import { KanjiRadicalsCardsComponent } from './components/radicals/cards/cards.component';
import { KanjiIrregularComponentsTagsComponent } from './components/irregular/tags/tags.component';
import { KanjiIrregularComponentsAddModalComponent } from './components/irregular/add-modal/add-modal.component';
import { AddKanjiFormMainFieldComponent } from './components/fields/add-main/add-main.component';

@NgModule({
  declarations: [
    KanjiHomeViewComponent,
    KanjiDetailViewComponent,
    KanjiRadicalsViewComponent,
    EditKanjiViewComponent,
    KanjiIrregularComponentsViewComponent,
    KanjiHomeTableComponent,
    KanjiDetailInfoComponent,
    KanjiDetailRadicalsComponent,
    KanjiRadicalsSearchComponent,
    KanjiRadicalsTagsComponent,
    KanjiRadicalsCardsComponent,
    KanjiIrregularComponentsTagsComponent,
    KanjiIrregularComponentsAddModalComponent,
    AddKanjiFormMainFieldComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    AutocompleteLibModule,
  ],
})
export class KanjiModule {}
