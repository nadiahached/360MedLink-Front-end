import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';


const routes: Routes = [
  {path: 'login',component:LoginComponent},
  {path: 'home',loadChildren: () =>
      import('./home/home.module').then(m => m.HomeModule)},
  {path: '', redirectTo: 'login', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
