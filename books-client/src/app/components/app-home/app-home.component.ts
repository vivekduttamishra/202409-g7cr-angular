import { Component } from '@angular/core';
import { BookService } from '../../../books/services/book.service';
import { Book } from '../../../books/models/book';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrl: './app-home.component.css'
})
export class AppHomeComponent {

  constructor(private bookService: BookService){}
  subscriber:any;
  
  book?:Book
  ngOnInit(){
    console.log('App Home Component initialized');
    this.subscriber=this.bookService
        .getRecommendedBook()
        .pipe(
          //filter(b=> b.author==='JK Rowling')
        )
        .subscribe({
          next: (book:any)=>this.book=book
        });

  }

  ngOnDestroy(){
    this.subscriber.unsubscribe();
  }

}
