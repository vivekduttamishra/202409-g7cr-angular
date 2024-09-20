import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars'
})
export class StarsPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
     value=parseFloat(value)*2;
     const half='½';
     const quarter='¼';
     const threeFourth='¾';

     const intPart=Math.floor(value);
     const floatPart = value-intPart;
     let stars = Array(intPart).fill('*').join('');
     return stars+(floatPart<.25?'':floatPart<0.5?quarter: floatPart<0.75 ? half: threeFourth);
  }

}
