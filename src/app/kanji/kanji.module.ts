import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { KanjiHomeViewComponent } from './views/home/home.component';
import { KanjiTableComponent } from './components/table/table.component';

@NgModule({
  declarations: [KanjiHomeViewComponent, KanjiTableComponent],
  imports: [CommonModule, FormsModule, AgGridModule],
})
export class KanjiModule {}
