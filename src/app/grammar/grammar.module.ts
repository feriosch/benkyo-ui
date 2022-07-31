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
import { AddClauseFormKeysComponent } from './components/add/fields/keys/keys.component';
import { AddClauseFormFormationsComponent } from './components/add/fields/formations/formations.component';
import { AddClauseFormExamplesFieldComponent } from './components/add/fields/examples/examples.component';
import { AddClauseFormNotesComponent } from './components/add/fields/notes/notes.component';
import { AddClauseFormExampleComponent } from './components/add/helpers/example/example.component';
import { AddClauseFormSectionComponent } from './components/add/helpers/section/section.component';
import { AddClauseFormRelatedComponent } from './components/add/fields/related/related.component';

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
    AddClauseFormKeysComponent,
    AddClauseFormFormationsComponent,
    AddClauseFormExamplesFieldComponent,
    AddClauseFormExampleComponent,
    AddClauseFormNotesComponent,
    AddClauseFormSectionComponent,
    AddClauseFormRelatedComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AgGridModule],
})
export class GrammarModule {}
