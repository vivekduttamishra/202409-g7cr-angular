import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[visible]'
})
export class VisibleDirective  {

  constructor(private element:ElementRef) { }

 

  @Input() set visible(value:boolean){
       
    if(!value){
      this.element.nativeElement.setAttribute('hidden','true');
    } else{
      this.element.nativeElement.removeAttribute('hidden');
    }
 
  }

}
