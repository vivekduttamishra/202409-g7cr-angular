import { Component, OnInit } from "@angular/core";
import { Book } from "../../models/book.model";
import { ChangeArgs } from "../../utils/components/range.component";
import {BookService} from '../../services/book.service';

@Component({
    selector: 'book-list',
    templateUrl: './book-list.component.html',
    styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
    
    constructor(private bookService:BookService){}
    ngOnInit(): void {
        this.books=this.bookService.getBooks();
    }


    imageHeight:number=120;
    showImages=true;

    public books: Book[] =[]


   

    toggleImages(){
        this.showImages=!this.showImages;
    }

}