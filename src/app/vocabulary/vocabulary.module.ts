import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { VocabularyHomeComponent } from './vocabulary-home/vocabulary-home.component';
import { WordTableComponent } from './home/word-table/word-table.component';
import { CollectionCardComponent } from './home/collection-card/collection-card.component';

@NgModule({
  declarations: [
    VocabularyHomeComponent,
    WordTableComponent,
    CollectionCardComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([])
  ]
})
export class VocabularyModule { }
