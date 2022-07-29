import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { GrammarHomeComponent } from './views/home/home.component';
import { ClauseDetailsComponent } from './views/details/details.component';
import { GrammarTableComponent } from './components/home/table/table.component';
import { MainInfoComponent } from './components/details/main-info/main-info.component';
import { SectionTitleComponent } from './components/details/section-title/section-title.component';
import { ExampleSentenceComponent } from './components/details/example-sentence/example-sentence.component';
import { FormationsComponent } from './components/details/formations/formations.component';
import { ExamplesComponent } from './components/details/examples/examples.component';
import { NotesComponent } from './components/details/notes/notes.component';
import { RelatedComponent } from './components/details/related/related.component';
import { GrammarAddViewComponent } from './views/add/add.component';
import { AddClauseFormComponent } from './components/add/form/form.component';
import { AddClauseFormTitleComponent } from './components/add/fields/title/title.component';
import { AddClauseFormTypeComponent } from './components/add/fields/type/type.component';
import { AddClauseFormTagsComponent } from './components/add/fields/tags/tags.component';
import { AddClauseFormDefinitionComponent } from './components/add/fields/definition/definition.component';

@NgModule({
  declarations: [
    GrammarHomeComponent,
    GrammarTableComponent,
    ClauseDetailsComponent,
    MainInfoComponent,
    SectionTitleComponent,
    ExampleSentenceComponent,
    FormationsComponent,
    ExamplesComponent,
    NotesComponent,
    RelatedComponent,
    GrammarAddViewComponent,
    AddClauseFormComponent,
    AddClauseFormTitleComponent,
    AddClauseFormTypeComponent,
    AddClauseFormTagsComponent,
    AddClauseFormDefinitionComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AgGridModule],
})
export class GrammarModule {}
