import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UpdateRequest } from 'src/models/kanji/requests.model';
import { KanjiMainForm } from 'src/models/kanji/forms/form.model';
import { FormService } from 'src/app/shared/services/form.service';

@Injectable({ providedIn: 'root' })
export class UpdateKanjiService {
  private readonly updateEndpoint: string;

  constructor(
    private http: HttpClient,
    private formService: FormService,
  ) {
    this.updateEndpoint = `${environment.backendUrl}/kanjis`;
  }

  getUpdateRequestBody(
    id: string,
    form: FormGroup<KanjiMainForm>,
  ): UpdateRequest {
    const v1: number = this.formService.getValue(form, 'v1');
    const v2: number | null = this.formService.getValue(form, 'v2');

    const kanji: string = this.formService.getValue(form, 'kanji');
    const on: string | null = this.formService.getValue(form, 'on');
    const kun: string | null = this.formService.getValue(form, 'kun');
    const spanish: string = this.formService.getValue(form, 'spanish');

    const components: string[] = this.formService.getValue(form, 'components');
    const story: string | null = this.formService.getValue(form, 'story');

    const requestBody: UpdateRequest = {
      kanji_id: id,
      v1: v1,
      kanji: kanji,
      spanish: spanish,
    };

    if (v2) requestBody.v2 = v2;
    if (on) requestBody.on = on;
    if (kun) requestBody.kun = kun;
    if (components) requestBody.components = components;
    if (story) requestBody.story = story;

    return requestBody;
  }

  updateWord(request: UpdateRequest): Observable<boolean> {
    return this.http.put<boolean>(this.updateEndpoint, request);
  }
}
