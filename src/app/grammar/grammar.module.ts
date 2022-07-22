import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { GrammarHomeComponent } from './views/home/home.component';
import { ClauseDetailsComponent } from './views/details/details.component';
import { GrammarTableComponent } from './components/home/table/table.component';
import { ExampleSentenceComponent } from './components/details/example-sentence/example-sentence.component';

@NgModule({
  declarations: [
    GrammarHomeComponent,
    GrammarTableComponent,
    ClauseDetailsComponent,
    ExampleSentenceComponent,
  ],
  imports: [CommonModule, FormsModule, AgGridModule],
})
export class GrammarModule {}
