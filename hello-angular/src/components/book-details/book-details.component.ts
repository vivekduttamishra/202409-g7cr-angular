import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {

    constructor(
      private route:ActivatedRoute,
      private bookService: BookService  // assuming BookService is a service that fetches book data from an API
    ){}

  
    id?: string;
    book:Book|null|undefined=null;

  ngOnInit(): void {
    this.id= this.route.snapshot.params['id'];
    this.book=this.bookService.getBookById(this.id!);
  }

}
