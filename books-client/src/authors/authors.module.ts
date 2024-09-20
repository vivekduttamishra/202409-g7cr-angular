import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorAddComponent } from './components/author-add/author-add.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { RouterModule, Routes } from '@angular/router';
import { UtilsModule } from '../utils/utils.module';
import { AuthGuard } from '../users/guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: AuthorListComponent },
  {
    path: 'add',
    component: AuthorAddComponent,
    //canActivate: [AuthGuard]
  },
  { path: ':authorId', component: AuthorDetailsComponent },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    UtilsModule
  ],
  declarations: [
    AuthorAddComponent,
    AuthorListComponent,
    AuthorDetailsComponent
  ],
  exports: [RouterModule]
})
export class AuthorsModule { }
