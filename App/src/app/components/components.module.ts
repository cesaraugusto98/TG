import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    
  ],
  exports:[
    LoadingComponent
  ]
})
export class ComponentsModule { }
