import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FileTypeValidatorService implements Validator {
  private readonly validTypes: Set<string>;

  constructor() {
    this.validTypes = new Set<string>(['jpg', 'jpeg', 'png', 'gif']);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (file) {
      const extension = file.name.split('.')[1].toLowerCase();
      if (this.validTypes.has(extension)) {
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
