import { Component, Input, OnInit } from '@angular/core';

import { Type } from 'src/models/responses/vocabulary/word.model';
import { TypeMapperService } from '../../../services/type-mapper.service';

@Component({
  selector: 'app-word-details-type-table',
  templateUrl: './type-table.component.html',
  styleUrls: ['./type-table.component.scss'],
})
export class WordDetailsTypeTableComponent implements OnInit {
  @Input()
  type!: Type;

  subtypes: string[];

  constructor(private typeMapperService: TypeMapperService) {
    this.subtypes = this.typeMapperService.backendSubtypes;
  }

  ngOnInit(): void {}

  getCellValue(name: string): number {
    if (this.type.hasOwnProperty(name)) {
      // @ts-ignore
      return this.type[name];
    }
    return 0;
  }

  getSubtypeValueText(value: number, subtype: string): string {
    let subtypeName =
      this.typeMapperService.getPrintingValueFromBackend(subtype);
    return this.typeMapperService.getValueText(value, subtypeName);
  }
}
