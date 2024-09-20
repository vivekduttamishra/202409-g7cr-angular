import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recommend'
})
export class RecommendPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    
    const index = Math.ceil(parseFloat(value)*2);
    const recommendations=[
      "", //0
      "", //0.5
        
      "Terrible.",  //1
      "Don't waste your time", //1.5
      "Read if you have nothing to do",
      "Time Pass",
      "Average",
      "Good Book. Should read",
      "Highly recommended",
      "Don't Miss this one."
    ]

    return recommendations[index];


  }

}
