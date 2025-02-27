import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailValidator {
  constructor() {}

  validate(control: AbstractControl): Observable<{ emailTaken: boolean } | null> {
    const existingEmails = ['heba@iqra.com', 'mohamed@gmail.com', 'ahmed1@gmail.com'];
    return of(existingEmails.includes(control.value)).pipe(
      delay(200),
      map(isTaken => (isTaken ? { emailTaken: true } : null))
    );
  }
}
