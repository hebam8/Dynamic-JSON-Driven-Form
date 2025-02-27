import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Uppercase'
})
export class CustomUppercasePipe implements PipeTransform {

  transform(value: string): string {
    if(!value)  return '';
    return value.toUpperCase();


  }

}
