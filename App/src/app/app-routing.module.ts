import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/account/home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './pages/account/login/login.module#LoginPageModule' },
  { path: 'multidisciplinar', loadChildren: './pages/questions/multidisciplinar/multidisciplinar.module#MultidisciplinarPageModule' },
  { path: 'raclogico', loadChildren: './pages/questions/raclogico/raclogico.module#RaclogicoPageModule' },
  { path: 'historia', loadChildren: './pages/questions/historia/historia.module#HistoriaPageModule' },
  { path: 'quimica', loadChildren: './pages/questions/quimica/quimica.module#QuimicaPageModule' },
  { path: 'ingles', loadChildren: './pages/questions/ingles/ingles.module#InglesPageModule' },
  { path: 'matematica', loadChildren: './pages/questions/matematica/matematica.module#MatematicaPageModule' },
  { path: 'fisica', loadChildren: './pages/questions/fisica/fisica.module#FisicaPageModule' },
  { path: 'geografia', loadChildren: './pages/questions/geografia/geografia.module#GeografiaPageModule' },
  { path: 'biologia', loadChildren: './pages/questions/biologia/biologia.module#BiologiaPageModule' },
  { path: 'portugues', loadChildren: './pages/questions/portugues/portugues.module#PortuguesPageModule' },
  { path: 'signup', loadChildren: './pages/account/signup/signup.module#SignupPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
