import {Component, OnInit} from '@angular/core';

import { OrderDirection, OrderField } from '../../../models/requests/kanji';
import { SummarizedKanji } from '../../../models/responses/kanji/kanji.model';
import { KanjiService } from '../kanji.service';

@Component({
  selector: 'app-kanji-home',
  templateUrl: './kanji-home.component.html',
  styleUrls: ['./kanji-home.component.scss']
})
export class KanjiHomeComponent implements OnInit {

  nextPageNumber: string;
  totalPages: number;
  totalKanjis: number;
  filter: string | null;
  orderField?: OrderField | null;
  orderDirection: OrderDirection | null;
  isKanjiFetchLoading: boolean;
  kanjis: SummarizedKanji[];

  constructor(public kanjiService: KanjiService) {
    this.nextPageNumber = '';
    this.totalPages = 0;
    this.totalKanjis = 0;
    this.filter = this.kanjiService.filter;
    this.orderField = null;
    this.orderDirection = null;
    this.isKanjiFetchLoading = false;
    this.kanjis = [];
  }

  getKanjis(): void {
    this.isKanjiFetchLoading = true;
    this.kanjiService.getKanjis(
      this.orderField,
      this.orderDirection
    ).toPromise()
      .then((response) => {
        this.kanjis = response.kanjis;
        this.nextPageNumber = response.next_page_number;
        this.totalPages = response.total_pages;
        this.totalKanjis = response.total_kanjis
      })
      .catch((error) => console.log(error))
      .finally(() => this.isKanjiFetchLoading = false);
  }

  applyFilter(): void {
    if (this.filter) {
      this.kanjiService.filter = this.filter;
      this.kanjiService.pageNumber = 1;
      this.getKanjis();
    }
  }

  onChangeFilter(value: any) {
    if (!value) {
      this.kanjiService.filter = null;
      this.kanjiService.pageNumber = 1;
      this.getKanjis();
    }
  }

  changeToFirstPage(): void {
    if (this.kanjiService.pageNumber! > 1) {
      this.kanjiService.pageNumber = 1;
    }
    this.getKanjis();
  }

  changeToPreviousPage(): void {
    if (this.kanjiService.pageNumber! > 1) {
      this.kanjiService.pageNumber = this.kanjiService.pageNumber! - 1;
    }
    this.getKanjis();
  }

  changeToNextPage(): void {
    if (this.nextPageNumber) {
      this.kanjiService.pageNumber = +this.nextPageNumber;
    }
    this.getKanjis();
  }

  changeToLastPage(): void {
    if (this.kanjiService.pageNumber! < this.totalPages) {
      this.kanjiService.pageNumber = this.totalPages;
    }
    this.getKanjis();
  }

  ngOnInit(): void {
    if (!this.kanjiService.pageSize) {
      this.kanjiService.pageSize = 10;
    }
    if (!this.kanjiService.pageNumber) {
      this.kanjiService.pageNumber = 1;
    }
    this.orderField = OrderField.v1;
    this.getKanjis();
  }

}
