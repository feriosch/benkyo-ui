import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  getControl<T extends AbstractControl>(form: FormGroup, control: string): T {
    return form.get(control)! as T;
  }

  getValue<T>(form: FormGroup, field: string): T {
    return <T>form.get(field)!.value;
  }
}
