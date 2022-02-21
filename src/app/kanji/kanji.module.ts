import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { KanjiHomeComponent } from './kanji-home/kanji-home.component';
import { KanjiTableComponent } from './kanji-home/kanji-table/kanji-table.component';


@NgModule({
  declarations: [
    KanjiHomeComponent,
    KanjiTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule
  ]
})
export class KanjiModule { }
