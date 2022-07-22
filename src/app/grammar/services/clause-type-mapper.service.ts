import { Injectable } from '@angular/core';
import { stringToArray } from 'ag-grid-community';

import { Type } from 'src/models/responses/grammar/clause.model';

@Injectable({ providedIn: 'root' })
export class ClauseTypeMapperService {
  constructor() {}

  getFullType(type: Type): string {
    let fullType: string[] = [];
    for (const [key, value] of Object.entries(type)) {
      if (value === true) fullType.push(String(key));
    }
    return fullType.join(', ');
  }
}
