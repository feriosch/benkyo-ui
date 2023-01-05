import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FileTypeValidatorService implements Validator {
  constructor() {}

  get validTypes(): string[] {
    return ['.jpg', '.jpeg', '.png', '.gif'];
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const validTypes: Set<String> = new Set<string>([
      'jpg',
      'jpeg',
      'png',
      'gif',
    ]);
    const file = control.value;
    if (file) {
      const extension = file.split('.')[1].toLowerCase();
      if (!validTypes.has(extension)) {
        return {
          requiredFileType: true,
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
