import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { IonicModule } from '@ionic/angular';
import { QuestionComponent } from './question/question.component';


@NgModule({
  declarations: [
    LoadingComponent,
    QuestionComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports:[
    LoadingComponent,
    QuestionComponent,
  ]
})
export class ComponentsModule { }
