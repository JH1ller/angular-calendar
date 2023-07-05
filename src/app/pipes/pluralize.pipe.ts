import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pluralize' })
export class PluralizePipe implements PipeTransform {
  transform(label: string, count: number): string {
    return `${label}${count !== 1 ? 's' : ''}`;
  }
}
