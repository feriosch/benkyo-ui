import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { SharedModule } from '../shared/shared.module';
import { KanjiModule } from '../kanji/kanji.module';
import { WordsHomeViewComponent } from './views/home/home.component';
import { WordDetailsViewComponent } from './views/details/details.component';
import { AddWordViewComponent } from './views/add/add.component';
import { EditWordViewComponent } from './views/edit/edit.component';
import { WordTableComponent } from './components/home/table/table.component';
import { CollectionCardComponent } from './components/home/collection-card/collection-card.component';
import { KanjiModalComponent } from './components/details/kanji-modal/kanji-modal.component';
import { WordCsvButtonComponent } from './components/home/csv-button/csv-button.component';
import { WordCsvJlptButtonComponent } from './components/home/csv-jlpt-button/csv-jlpt-button.component';
import { WordDetailsMainInfoComponent } from './components/details/main-info/main-info.component';
import { WordDetailsTypeTableComponent } from './components/details/type-table/type-table.component';
import { WordDetailsTagsComponent } from './components/details/tags/tags.component';
import { WordDetailsDeleteModalComponent } from './components/details/delete-modal/delete-modal.component';
import { AddWordFormComponent } from './components/add/form/add-form.component';
import { AddWordFormWordFieldComponent } from './components/add/fields/word/word.component';
import { AddWordFormSpanishFieldComponent } from './components/add/fields/spanish/spanish.component';
import { AddWordFormTypeFieldComponent } from './components/add/fields/type/type.component';
import { AddWordFormTagsFieldComponent } from './components/add/fields/tags/tags.component';
import { AddWordFormNotesFieldComponent } from './components/add/fields/notes/notes.component';
import { AddWordFormCollectionFieldComponent } from './components/add/fields/collection/collection.component';
import { AddWordFormSentencesFieldComponent } from './components/add/fields/sentences/sentences.component';
import { AddWordFormSubmitFieldComponent } from './components/add/fields/submit/submit.component';
import { EditWordFormComponent } from './components/edit/form/edit-form.component';
import { EditWordFormWordFieldComponent } from './components/edit/fields/word/word.component';

@NgModule({
  declarations: [
    WordsHomeViewComponent,
    WordDetailsViewComponent,
    AddWordViewComponent,
    EditWordViewComponent,
    WordTableComponent,
    CollectionCardComponent,
    KanjiModalComponent,
    WordCsvButtonComponent,
    WordCsvJlptButtonComponent,
    WordDetailsMainInfoComponent,
    WordDetailsTypeTableComponent,
    WordDetailsTagsComponent,
    WordDetailsDeleteModalComponent,
    AddWordFormComponent,
    AddWordFormWordFieldComponent,
    AddWordFormSpanishFieldComponent,
    AddWordFormTypeFieldComponent,
    AddWordFormTagsFieldComponent,
    AddWordFormNotesFieldComponent,
    AddWordFormCollectionFieldComponent,
    AddWordFormSentencesFieldComponent,
    AddWordFormSubmitFieldComponent,
    EditWordFormComponent,
    EditWordFormWordFieldComponent,
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
