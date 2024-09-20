import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'http-action',
  templateUrl: './http-action.component.html',
  styleUrl: './http-action.component.css'
})
export class HttpActionComponent {

  errorCode?:number;
  status?:string;
  @Input() data:any;
  @Output() dataChange=new EventEmitter<any>();
  @Output() error= new EventEmitter<string>();
  @Output() complete=new EventEmitter<void>();

  @Input() observable:any;

  ngOnInit(){
    this.errorCode=undefined;
    this.status='loading';
    this.observable.susbcribe({
      next: (data:any)=> this.dataChange.emit(data),
      error: (error:any)=> {
        this.errorCode=error.status;
        this.status='error';
        this.error.emit(error);
      },
      complete: ()=> {
        this.status='complete';
        this.complete.emit();
      }
    })
  }

}
