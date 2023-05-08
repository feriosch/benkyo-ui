import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { KanjiAddIrregularComponentBody } from 'src/models/kanji/components/irregular.model';
import { KanjiAddIrregularComponentResponse } from 'src/models/kanji/components/responses.model';

@Injectable({ providedIn: 'root' })
export class AddIrregularComponentService {
  private readonly irregularComponentsUrl: string;

  constructor(private http: HttpClient) {
    this.irregularComponentsUrl = `${environment.backendUrl}/kanjis/components/irregular`;
  }

  transform(value: any): KanjiAddIrregularComponentBody {
    let component: string;
    let radicals: string[] = [];

    if (value.hasOwnProperty('component')) component = <string>value.component;
    if (value.hasOwnProperty('radicals')) radicals = <string[]>value.radicals;

    radicals = radicals.filter((radical: string) => radical);

    return {
      component: component!,
      radicals: radicals!,
    };
  }

  postComponent(
    body: KanjiAddIrregularComponentBody
  ): Observable<KanjiAddIrregularComponentResponse> {
    return this.http.post<KanjiAddIrregularComponentResponse>(
      this.irregularComponentsUrl,
      body
    );
  }
}
