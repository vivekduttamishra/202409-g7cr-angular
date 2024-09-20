import { Component, Input } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'book-card',
  template: `
  @if(book){
    <div class="m-2 card" style="width: 18rem;">
            <img [src]="book.cover" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{book.title}}</h5>
              
              <h4 class="card-text">Rating:  {{book.rating|recommend}}</h4>
             
              <p [visible]='book.price>0' class=" card-text">
                Price: {{book.price|currency:'INR'}}
              </p>

              <p class="card-text">{{ book.description | blurb:100 | uppercase}}</p>

              <a  [routerLink]="['/books',book.id]" class="btn btn-primary">Details</a>
            
            </div>
          </div>
  }
  `,
  styles: ``
})
export class BookCardComponent {

    @Input() book?: Book;

}
