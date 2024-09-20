import { Component, Input } from '@angular/core';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

  @Input() title:string="Not Found";
  @Input() message:string="Sorry we couldn't find what you are looking for"

}
