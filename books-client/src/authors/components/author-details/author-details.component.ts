import { Component } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../../models/author.model';
import { delay } from 'rxjs';

@Component({
  selector: 'author-details',
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {

  constructor(
      private authorService: AuthorService,
      private route: ActivatedRoute,
    ){}

    author?: Author;
    errorCode?: number;
    paramsSubscriber?:any;
    authorSubscriber?:any;
    id?:string;


    fetchAuthorById(id:string){
      this.errorCode=undefined;
      this.authorSubscriber= this
            .authorService
            .getAuthorById(id)
            .pipe(
              delay(5000)
            )
            .subscribe({
              next: author=>{
                this.author=author;
              },
              error: error=>{
                this.errorCode=error.status;
                this.author=undefined;
              }
            })
    }

    ngOnInit(){
      //this.id = this.route.snapshot.params['authorId'];

      this.paramsSubscriber=this.route.params.subscribe({
        next: params=>{
          this.id = params['authorId'];
          //fetch the new id details
          this.fetchAuthorById(this.id!);
        }
      })


    }

}
