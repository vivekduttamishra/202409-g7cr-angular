import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, take, tap, throwError } from 'rxjs';
import { Author } from '../models/author.model';

const baseUrl = 'http://localhost:8000/api/authors';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) {}


  _get<T>(url:string){
    return this
            .http
            .get<T>(url)
            .pipe(
              tap(console.log),
              catchError(error=> {
                console.log('error received by service',error);
                return throwError(()=>error)
              })
  
            )
  }

  getAllAuthors(){
    //return of([]);
    console.log('request for authors received');
    return this._get<Author[]>(baseUrl);
    

  }

  getAuthorById(id:string){
    return this._get(`${baseUrl}/${id}`)
  }


}
