import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonLoop'
})
export class JsonLoopPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const keys = [];
    for (const key in value) {
      if (!key) {
        continue;
      }
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }

}
