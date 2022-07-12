import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GrammarHomeComponent } from './grammar-home/grammar-home.component';

@NgModule({
  declarations: [GrammarHomeComponent],
  imports: [CommonModule, FormsModule],
})
export class GrammarModule {}
