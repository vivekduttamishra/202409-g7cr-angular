import { Component, Input } from '@angular/core';

interface Link{
  linkText:string;
  linkUrl:string;
  icon?:string;
 }

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {

  
  @Input() title:string=""

  @Input() links:Link[]=[
    {
      linkText: 'Authors',
      linkUrl: '/authors'
    },
    {
      linkText: 'Add Author',
      linkUrl: '/authors/add'
    },
    {
      linkText: 'Books',
      linkUrl: '/books'
    },
    {
      linkText: 'Add Book',
      linkUrl: '/books/add'
    },

  ];


}
