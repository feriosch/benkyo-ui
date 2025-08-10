import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  getControl<T extends AbstractControl>(form: UntypedFormGroup, control: string): T {
    return form.get(control)! as T;
  }

  getValue<T>(form: UntypedFormGroup, field: string): T {
    return <T>form.get(field)!.value;
  }
}
