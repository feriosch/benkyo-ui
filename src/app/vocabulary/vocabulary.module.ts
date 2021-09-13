import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { VocabularyHomeComponent } from './vocabulary-home/vocabulary-home.component';
import { WordTableComponent } from './home/word-table/word-table.component';
import { CollectionCardComponent } from './home/collection-card/collection-card.component';
import { AddWordFormComponent } from './add-word/add-word-form/add-word-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTypeTableComponent } from './add-word/add-type-table/add-type-table.component';
import { AddTagsComponent } from './add-word/add-tags/add-tags.component';
import { AddSentencesComponent } from './add-word/add-sentences/add-sentences.component';
import { AddWordComponent } from './add-word/add-word.component';


@NgModule({
  declarations: [
    VocabularyHomeComponent,
    WordTableComponent,
    CollectionCardComponent,
    AddWordFormComponent,
    AddTypeTableComponent,
    AddTagsComponent,
    AddSentencesComponent,
    AddWordComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule
  ]
})
export class VocabularyModule { }
