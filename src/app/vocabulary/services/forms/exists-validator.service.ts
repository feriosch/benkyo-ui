import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { VocabularyService } from '../vocabulary.service';

@Injectable({ providedIn: 'root' })
export class ExistsValidatorService implements AsyncValidator {
  constructor(private vocabularyService: VocabularyService) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.vocabularyService.searchWordByWord(control.value!).pipe(
      map((response) => {
        if (response != null) {
          return { repeatedWord: response.from };
        }
        return null;
      }),
      catchError((error) => of({ repeatedWord: error }))
    );
  }
}
