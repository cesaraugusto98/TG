import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/account/home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './pages/account/login/login.module#LoginPageModule' },
  { path: 'multidisciplinar', loadChildren: './pages/questions/multidisciplinar/multidisciplinar.module#MultidisciplinarPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
