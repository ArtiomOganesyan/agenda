import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testPipe',
})
export class TestPipePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return value === 'test' ? value + '1' : value;
  }
}
