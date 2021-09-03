import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { VocabularyHomeComponent } from './vocabulary-home/vocabulary-home.component';
import { WordTableComponent } from './word-table/word-table.component';

@NgModule({
  declarations: [
    VocabularyHomeComponent,
    WordTableComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([])
  ]
})
export class VocabularyModule { }
