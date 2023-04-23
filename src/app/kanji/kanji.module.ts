import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { KanjiHomeViewComponent } from './views/home/home.component';
import { KanjiDetailViewComponent } from './views/detail/detail.component';
import { KanjiHomeTableComponent } from './components/home/table/table.component';
import { KanjiDetailInfoComponent } from './components/detail/info/info.component';
import { KanjiDetailRadicalsComponent } from './components/detail/radicals/radicals.component';

@NgModule({
  declarations: [
    KanjiHomeViewComponent,
    KanjiDetailViewComponent,
    KanjiHomeTableComponent,
    KanjiDetailInfoComponent,
    KanjiDetailRadicalsComponent,
  ],
  imports: [CommonModule, FormsModule, AgGridModule],
})
export class KanjiModule {}
