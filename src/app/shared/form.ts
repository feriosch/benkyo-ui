import { AbstractControl, FormGroup } from '@angular/forms';

export const getControl = <T extends AbstractControl>(
  form: FormGroup,
  control: string
): T => {
  return form.get(control)! as T;
};

export const getValue = <T>(form: FormGroup, field: string): T => {
  return <T>form.get(field)!.value;
};
