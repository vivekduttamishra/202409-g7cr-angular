import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ChangeArgs{
  originalValue:number;
  direction:number;
  newValue:number;
  delta:number;
}


@Component({
  selector: 'ca-range',
  template: `
    <div>
        <button 
            class='btn btn-primary btn-sm'
            (click)='_change(-1)'
            [disabled]='value<=min'                     
            >-</button>
        <span>{{value}}</span>
        <button 
            class='btn btn-primary btn-sm'
            (click)='_change(1)'
            [disabled]='value>=max'
            >+</button>
    </div>
  `,
  styles: `
  
    p{
      color:white;
    }
    div{
      max-width:120px;
      min-width:120px;
      
    }
    button{
      width:35px;
      box-sizing:border-box;
      
    }
    span{
      width:35px;
      text-align:center;
      min-width:35px;
      max-width:35px;
      padding:2px;
      box-sizing:border-box;
    }
  `
})
export class RangeComponent {

  @Input() min:number =0;
  @Input() max:number =100;
  @Input() delta:number=15;
  @Input() value:number=50;
  //@Output() update=new EventEmitter<number>();
  @Output() valueChange=new EventEmitter<number>();

  
  
  _change(direction:number){
    const newValue=this.value+direction*this.delta;
    const originalValue=this.value;
    this.value=Math.min(Math.max(newValue,this.min),this.max);
    this.valueChange.emit(this.value);


    var args:ChangeArgs={
      originalValue,
      direction:direction,
      newValue:this.value,
      delta:this.delta
    }
    
    if(args.originalValue!==args.newValue){
      this.change.emit(args);
    }  
    
    
  }
  @Output() change= new EventEmitter<ChangeArgs>();

}
