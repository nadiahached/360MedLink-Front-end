import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import {ProfileComponent} from '../profile/profile.component';
import {NotfoundComponent} from '../notfound/notfound.component';
import {TasksComponent} from '../tasks/tasks.component';
import {SalariesComponent} from '../salaries/salaries.component';
import {CongeComponent} from '../conge/conge.component';
import {HistoriqueCongeComponent} from '../historique-conge/historique-conge.component';



const routes: Routes = [

  {
    path: '', component: HomeComponent, children: [
      {
        path: 'profile', component: ProfileComponent
      },
      {
        path: 'users', loadChildren: () => import('./../users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'conge', component: CongeComponent
      },
      {
        path: 'timeSheet', loadChildren: () => import('./../time-sheet/time-sheet.module').then(m => m.TimeSheetModule)
      },
      {
        path: 'salaries', component: SalariesComponent
      },
      {
        path: 'conge/historique', component: HistoriqueCongeComponent
      },
      {
        path: '', redirectTo: 'profile', pathMatch: 'full'
      },
      {
        path: '**', component: NotfoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes,)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
