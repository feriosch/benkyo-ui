import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { SharedModule } from '../shared/shared.module';
import { KanjiModule } from '../kanji/kanji.module';
import { WordsHomeViewComponent } from './views/home/home.component';
import { WordDetailsViewComponent } from './views/details/details.component';
import { AddWordViewComponent } from './views/add/add.component';
import { WordTableComponent } from './components/home/table/table.component';
import { CollectionCardComponent } from './components/home/collection-card/collection-card.component';
import { AddWordFormComponent } from './add-word/add-word-form/add-word-form.component';
import { EditWordFormComponent } from './add-word/edit-word-form/edit-word-form.component';
import { AddTypeTableComponent } from './add-word/add-type-table/add-type-table.component';
import { AddTagsComponent } from './add-word/add-tags/add-tags.component';
import { AddSentencesComponent } from './add-word/add-sentences/add-sentences.component';
import { KanjiModalComponent } from './word-details/kanji-modal/kanji-modal.component';
import { CsvButtonComponent } from './components/home/csv-button/csv-button.component';

@NgModule({
  declarations: [
    WordsHomeViewComponent,
    WordDetailsViewComponent,
    AddWordViewComponent,
    WordTableComponent,
    CollectionCardComponent,
    AddWordFormComponent,
    EditWordFormComponent,
    AddTypeTableComponent,
    AddTagsComponent,
    AddSentencesComponent,
    KanjiModalComponent,
    CsvButtonComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    SharedModule,
    KanjiModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class VocabularyModule {}
