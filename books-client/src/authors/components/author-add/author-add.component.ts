import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lowerCase, noSpaces } from '../../../utils/services/ca-validators';

@Component({
  selector: 'author-add',
  templateUrl: './author-add.component.html',
  styleUrl: './author-add.component.css'
})
export class AuthorAddComponent {

      authorForm: FormGroup=new FormGroup({
        id: new FormControl('',[lowerCase,noSpaces]),
        name: new FormControl('',[Validators.required]),
        photo: new FormControl('',[Validators.required]),
        biography: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
        tags: new FormControl('author'),
      });

      get id(){ return this.authorForm.get('id')!;}
      get name(){ return this.authorForm.get('name')!;}
      get photo(){ return this.authorForm.get('photo')!;}
      get biography(){ return this.authorForm.get('biography')!;}
      get tags(){ return this.authorForm.get('tags')!;}

      handleSubmit = () => {
        console.log('form submited', this. authorForm)
      }

}
