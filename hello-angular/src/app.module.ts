import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppHomeComponent } from "./components/app-home/app-home.component";
import { AppHeaderComponent } from "./components/app-header/app-header.component";
import { AppFooterComponent } from "./components/app-footer/app-footer.component";
import { BookListComponent } from "./components/book-list/book-list.component";
import { RangeComponent } from './utils/components/range.component';
import { FormsModule } from "@angular/forms";
import { UserLoginComponent } from './components/user-login/user-login.component';
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookService } from "./services/book.service";
import { UserService } from "./services/user.service";
import { UserRegistrationComponent } from './app/components/user-registration/user-registration.component';


const routes : Routes =[
    {path: '',  pathMatch:'full', redirectTo:'/home'},
    {path: 'home', component: AppHomeComponent, pathMatch:'full'},
    
    //book routes
    {path:'books', component: BookListComponent},

    {path: 'books/:id', component:BookDetailsComponent},
    //user routes
    {path:'login', component: UserLoginComponent},
    
    //catch all route
    {path: '**', component: NotFoundComponent}
]


@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    declarations:[
        AppComponent,
        AppHomeComponent,
        AppHeaderComponent,
        AppFooterComponent,
        BookListComponent,
        RangeComponent,
        UserLoginComponent,
        NotFoundComponent,
        BookDetailsComponent,
        UserRegistrationComponent
    ],
    providers:[
        BookService,
        //UserService  //not registered.
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule{

}