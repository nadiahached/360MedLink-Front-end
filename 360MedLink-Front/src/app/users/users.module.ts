import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxLoadingModule} from 'ngx-loading';
import { AppToasterService} from '../providers/toaster.service';
import { UsersListComponent} from '../users/users-list/users-list.component';
import { BillingService} from '../providers/billing.service';
import { HostService} from '../providers/host.service';
import { ProfileService} from '../providers/profile.service';
import { SaleryService} from '../providers/salery.service';
import { NgxPaginationModule} from 'ngx-pagination';
import { UpdateUserComponent} from '../users/update-user/update-user.component';
import { UsersRoutingModule} from './users-routing';
import { UserService} from '../providers/user.service';
import { ManageUsersRolesComponent } from './manage-users-roles/manage-users-roles.component';
import { ManageUserSalariesComponent } from './manage-user-salaries/manage-user-salaries.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UsersRoutingModule,
    NgxLoadingModule.forRoot({}),
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  declarations: [
    UsersListComponent,
    UpdateUserComponent,
    ManageUsersRolesComponent,
    ManageUserSalariesComponent
  ],
  exports: [],
  entryComponents: [],
  providers:[
    AppToasterService,
    BillingService,
    HostService,
    ProfileService,
    SaleryService,
    UserService

  ]
})
export class UsersModule {}
