import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bdt',
  standalone: true,
})
export class BdtPipe implements PipeTransform {
  transform(value: string | null): string {
    return value ? `৳${value}` : '৳0';
  }
}
