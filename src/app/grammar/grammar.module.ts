import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { GrammarHomeComponent } from './grammar-home/grammar-home.component';
import { GrammarTableComponent } from './grammar-home/grammar-table/grammar-table.component';
import { ClauseDetailsComponent } from './clause-details/clause-details.component';

@NgModule({
  declarations: [
    GrammarHomeComponent,
    GrammarTableComponent,
    ClauseDetailsComponent,
  ],
  imports: [CommonModule, FormsModule, AgGridModule],
})
export class GrammarModule {}
