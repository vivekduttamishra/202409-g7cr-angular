import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { delay, filter, map, tap } from 'rxjs';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  loaded:boolean=false;
  constructor(private bookService: BookService) { }

  async ngOnInit(): Promise<void> {
    this.bookService
        .getBooks()
        //we can configure middleware
        .pipe(
          // delay(1000),
          // tap((book:any)=> console.log('book',book)),
          // map((book:any)=>({...book,price:0})),
          // filter((book:Book)=> book.price===0)
        )
        .subscribe({
          next: (book:any)=> this.books.push(book),
          complete: ()=> this.loaded=true
        })
    
  }



}
