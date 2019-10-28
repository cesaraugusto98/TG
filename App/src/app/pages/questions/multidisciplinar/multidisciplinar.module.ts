import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MultidisciplinarPage } from './multidisciplinar.page';
import { QuestionComponent } from 'src/app/components/question/question.component';

const routes: Routes = [
  {
    path: '',
    component: MultidisciplinarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionComponent,
    RouterModule.forChild(routes)
  ],
  declarations: [MultidisciplinarPage]
})
export class MultidisciplinarPageModule {}
