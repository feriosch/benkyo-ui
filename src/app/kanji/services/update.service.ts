import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { getValue } from 'src/app/shared/form';
import { UpdateRequest } from 'src/models/kanji/requests.model';

@Injectable({ providedIn: 'root' })
export class UpdateKanjiService {
  getUpdateRequestBody(id: string, form: FormGroup): UpdateRequest {
    const v1: number = getValue<number>(form, 'v1');
    const v2: number | null = getValue<number>(form, 'v2');

    const kanji: string = getValue<string>(form, 'kanji');
    const on: string | null = getValue<string>(form, 'on');
    const kun: string | null = getValue<string>(form, 'kun');
    const spanish: string = getValue<string>(form, 'spanish');

    const components: string[] = getValue<string[]>(form, 'components');
    const story: string | null = getValue<string>(form, 'story');

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
}
