import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxLoadingModule} from 'ngx-loading';
import {AppToasterService} from '../providers/toaster.service';
import {ProfileComponent} from '../profile/profile.component';
import {BillingService} from '../providers/billing.service';
import {HostService} from '../providers/host.service';
import {ProfileService} from '../providers/profile.service';
import {SaleryService} from '../providers/salery.service';
import {HomeRoutingModule} from './home-routing.module';
import {TasksComponent} from '../tasks/tasks.component';
import {SalariesComponent} from '../salaries/salaries.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {UsersModule} from '../users/users.module';
import {FileService} from '../providers/file.service';
import {CongeComponent} from '../conge/conge.component';
import {CongeService} from '../providers/conge.service';
import {HistoriqueCongeComponent} from '../historique-conge/historique-conge.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({}),
    HomeRoutingModule,
    NgxPaginationModule

  ],
  declarations: [
    ProfileComponent,
    TasksComponent,
    SalariesComponent,
    CongeComponent,
    HistoriqueCongeComponent,

  ],
  exports: [],
  entryComponents: [],
  providers:[
    AppToasterService,
    BillingService,
    HostService,
    ProfileService,
    SaleryService,
    UsersModule,
    FileService,
    CongeService


  ]
})
export class HomeModule {}
