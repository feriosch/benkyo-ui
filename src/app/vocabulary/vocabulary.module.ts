import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { VocabularyHomeComponent } from './home/vocabulary-home.component';
import { WordTableComponent } from './home/word-table/word-table.component';
import { CollectionCardComponent } from './home/collection-card/collection-card.component';
import { AddWordFormComponent } from './add-word/add-word-form/add-word-form.component';
import { EditWordFormComponent } from './add-word/edit-word-form/edit-word-form.component';
import { AddTypeTableComponent } from './add-word/add-type-table/add-type-table.component';
import { AddTagsComponent } from './add-word/add-tags/add-tags.component';
import { AddSentencesComponent } from './add-word/add-sentences/add-sentences.component';
import { AddWordComponent } from './add-word/add-word.component';
import { WordDetailsComponent } from './word-details/word-details.component';


@NgModule({
  declarations: [
    VocabularyHomeComponent,
    WordTableComponent,
    CollectionCardComponent,
    AddWordFormComponent,
    EditWordFormComponent,
    AddTypeTableComponent,
    AddTagsComponent,
    AddSentencesComponent,
    AddWordComponent,
    WordDetailsComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VocabularyModule { }
