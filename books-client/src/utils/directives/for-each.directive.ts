import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';



@Directive({
  selector: '[caFor]'  // You use this as *caFor in the template
})
export class ForEachDirective {
  
  @Input() set caForOf(collection: any[]) {
   
    this.viewContainer.clear();
    let i=0;
    for(let item of collection){
      this.viewContainer.createEmbeddedView(this.templateRef,{
        $implicit:item,
        $index:i,
        $even: i%2===0,
        $odd: i%2!==0,
        $first: i===0,
        $last: i===collection.length-1        
      });
      i++;
    }

    // collection.forEach((item, index) => {
    //   this.viewContainer.createEmbeddedView(this.templateRef, {
    //     $implicit: item,
    //     index: index,
    //     even: index % 2 === 0,
    //     odd: index % 2 !== 0
    //   });
    // });
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }
}
