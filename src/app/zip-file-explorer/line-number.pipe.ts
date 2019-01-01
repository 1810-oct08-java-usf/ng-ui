import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineNumber'
})
/**
 * Class lineNumberPipe
 * A pipe to insert line numbers.
 * @author Andrew Mitchem (1810-Oct08-Java-USF)
 */
export class LineNumberPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return this.splitMethod(value);
  }

  splitMethod(value) {
    const lines = value.split('\n');
    let returnValue = '';
    for (let i = 0; i < lines.length; i++) {
      returnValue +=  ' ' + (i + 1).toString().padStart(3, ' ') + '   ' + lines[i] + '\n';
    }
    return returnValue;
  }
}
