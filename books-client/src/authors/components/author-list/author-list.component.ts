import { Component } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';

@Component({
  selector: 'author-list',
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css'
})
export class AuthorListComponent {

  constructor(private authorService: AuthorService){}
  authors:Author[]=[];

  errorCode?:number
  subscriber:any;

  handleFetchAuthors(){
    this.errorCode=undefined;
    this.subscriber=this
      .authorService
      .getAllAuthors()
      .subscribe({
        next: (authors:Author[])=> this.authors=authors,
        error: (error:any)=>this.errorCode=error.status
      });

  }

  ngOnInit(){
    this.handleFetchAuthors();
    
  }

  ngOnDestroy(){
    this.subscriber?.unsubscribe();
  }

}
