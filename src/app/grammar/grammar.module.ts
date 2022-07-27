import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  ],
  imports: [CommonModule, FormsModule, AgGridModule],
})
export class GrammarModule {}
