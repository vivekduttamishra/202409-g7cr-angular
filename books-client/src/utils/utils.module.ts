import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StarsPipe } from './pipes/stars.pipe';
import { BlurbPipe } from './pipes/blurb.pipe';
import { VisibleDirective } from './directives/visible.directive';
import { ForEachDirective } from './directives/for-each.directive';
import { FieldSetComponent } from './components/field-set/field-set.component';
import { NoSpaceDirective } from './directives/no-space.directive';
import { HttpActionComponent } from './components/http-action/http-action.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    StarsPipe,
    BlurbPipe,
    VisibleDirective,
    ForEachDirective,
    FieldSetComponent,
    NoSpaceDirective,
    HttpActionComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NotFoundComponent,
    VisibleDirective,
    StarsPipe,
    BlurbPipe,
    ForEachDirective,
    FieldSetComponent,
    NoSpaceDirective,
  ]
})
export class UtilsModule { }
