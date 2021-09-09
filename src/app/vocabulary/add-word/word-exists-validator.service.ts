import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

import { VocabularyService } from '../vocabulary.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'


@Injectable({ providedIn: 'root' })
export class WordExistsValidator implements AsyncValidator {

  constructor (private vocabularyService: VocabularyService) { }

  validate (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.vocabularyService.searchWordByWord(control.value!)
      .pipe(
        map(response => {
          if (response != null) {
            console.log(response.spanish)
            return { repeatedWord: true }
          }
          return null;
        }),
        catchError(() => of({ repeatedWord: true }))
      );
  }

}
