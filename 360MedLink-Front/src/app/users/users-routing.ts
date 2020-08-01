import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersListComponent} from '../users/users-list/users-list.component';
import {UpdateUserComponent} from './update-user/update-user.component';
import {ManageUsersRolesComponent} from './manage-users-roles/manage-users-roles.component';
import {ManageUserSalariesComponent} from './manage-user-salaries/manage-user-salaries.component';



const routes: Routes = [

  {
    path: '', component: UsersListComponent, children: [
      {path: 'update/:id', component:UpdateUserComponent},
      {path: 'roles', component:ManageUsersRolesComponent},
      {path: 'salary/:id', component:ManageUserSalariesComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes,)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
