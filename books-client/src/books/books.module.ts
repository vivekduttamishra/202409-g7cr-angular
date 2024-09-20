import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { RouterModule, Routes } from '@angular/router';
import { BookCardComponent } from './components/book-card/book-card.component';
import { UtilsModule } from '../utils/utils.module';
import { RecommendPipe } from './pipes/recommend.pipe';

const routes:Routes=[
   // /books/...
  {path: '', component: BookListComponent},
  {path:'add', component: BookAddComponent},
  {path:':id', component: BookDetailsComponent},
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UtilsModule
  ],

  declarations: [
    BookListComponent,
    BookDetailsComponent,
    BookAddComponent,
    BookCardComponent,
    RecommendPipe
  ],
  
  exports:[
    // BookListComponent,
    // BookAddComponent,
    // BookDetailsComponent
    RouterModule,
    BookCardComponent,
    
  ]
})
export class BooksModule { }
