import { Injectable } from '@angular/core';

import { AddClauseBody } from 'src/models/requests/grammar/add-clause.model';
import {
  Example,
  Formation,
  Related,
  Section,
  Tags,
  Type,
} from 'src/models/responses/grammar/clause.model';

@Injectable({ providedIn: 'root' })
export class AddClauseValuesTransformerService {
  transform(value: any, id?: string): AddClauseBody {
    let title: string;
    let translation: string;
    let level: string;
    let type: Type;
    let definition: string;

    let keys: Example[] = [];
    let formations: Formation[] = [];
    let notes: Section[] = [];

    if (value.hasOwnProperty('title')) title = <string>value.title;

    if (value.hasOwnProperty('translation'))
      translation = <string>value.translation;
    if (value.hasOwnProperty('level')) level = <string>value.level;

    if (value.hasOwnProperty('type')) {
      const typeValues: any = value.type;
      for (const property in typeValues) {
        if (!typeValues[property]) delete typeValues[property];
      }
      type = <Type>typeValues;
    }

    if (value.hasOwnProperty('definition'))
      definition = <string>value.definition;
    if (value.hasOwnProperty('keys')) keys = <Example[]>value.keys;
    if (value.hasOwnProperty('formations'))
      formations = <Formation[]>value.formations;
    if (value.hasOwnProperty('notes')) notes = <Section[]>value.notes;

    const addClauseBody: AddClauseBody = {
      title: title!,
      translation: translation!,
      level: level!,
      clause_type: type!,
      definition: definition!,
      keys: keys,
      formations: formations,
      notes: notes,
    };

    if (value.hasOwnProperty('hiragana')) {
      if (value.hiragana) addClauseBody.hiragana = <string>value.hiragana;
    }

    if (value.hasOwnProperty('tags')) {
      const tagsValues: any = value.tags;
      for (const property in tagsValues) {
        if (!tagsValues[property]) delete tagsValues[property];
      }
      if (Object.keys(tagsValues).length > 0)
        addClauseBody.tags = <Tags>tagsValues;
    }

    if (value.hasOwnProperty('examples')) {
      if (value.examples && value.examples.length > 0)
        addClauseBody.examples = <Example[]>value.examples;
    }

    if (value.hasOwnProperty('related')) {
      if (value.related && value.related.length > 0)
        addClauseBody.related = <Related[]>value.related;
    }

    return addClauseBody;
  }
}
