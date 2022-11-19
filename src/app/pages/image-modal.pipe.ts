import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageModal'
})
export class ImageModalPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
