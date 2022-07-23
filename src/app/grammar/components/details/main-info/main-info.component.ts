import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { Type } from 'src/models/responses/grammar/clause.model';
import { ClauseTypeMapperService } from 'src/app/grammar/services/type-mapper.service';

@Component({
  selector: 'app-clause-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss'],
})
export class MainInfoComponent implements OnInit, OnChanges {
  @Input()
  title: string;

  @Input()
  hiragana: string | undefined;

  @Input()
  type: Type;

  @Input()
  level: string;

  fullType: string;

  constructor(private typeMapperService: ClauseTypeMapperService) {
    this.title = '';
    this.type = {};
    this.level = '';
    this.fullType = '';
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.fullType = this.typeMapperService.getFullType(this.type!)
  }

  ngOnInit(): void {
  }



}
