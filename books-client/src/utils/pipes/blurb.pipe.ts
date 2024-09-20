import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blurb'
})
export class BlurbPipe implements PipeTransform {

  transform(value: any, max:number=50, ...args: unknown[]): string {
    let text=value.toString();
    

    if(text.length<max)
         return text;


    return text.substring(0,max)+'...';

  }

}
