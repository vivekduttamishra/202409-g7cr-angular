import { Component, Input } from '@angular/core';

@Component({
  selector: 'field-set',
  template: `
    <fieldset>
      <legend>{{title}}</legend>
      <div class='m-2'>
      <ng-content></ng-content> 
      </div> 
    </fieldset>
  `,
  styles: `
    fieldset{
      border:1px solid #ccc;
    }
    legend{
      background-color:gray;
      color:black;
    }
  `
})
export class FieldSetComponent {
  @Input() title:string='';
}
