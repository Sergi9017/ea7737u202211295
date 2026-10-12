import { AbstractControl, ValidationErrors } from '@angular/forms';

export const notBlankValidator = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (typeof value !== 'string' || value.length === 0) return null;
  return value.trim().length === 0 ? { blank: true } : null;
};
