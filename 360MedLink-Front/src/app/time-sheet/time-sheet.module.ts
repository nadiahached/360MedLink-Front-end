import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxLoadingModule} from 'ngx-loading';
import {NgxPaginationModule} from 'ngx-pagination';
import {AppToasterService} from '../providers/toaster.service';
import {BillingService} from '../providers/billing.service';
import {HostService} from '../providers/host.service';
import {ProfileService} from '../providers/profile.service';
import {SaleryService} from '../providers/salery.service';
import {UsersModule} from '../users/users.module';
import {FileService} from '../providers/file.service';
import {ViewFileComponent} from '../time-sheet/view-file/view-file.component';
import {ProgressComponent} from './progress/progress.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import { FileListComponent } from './file-list/file-list.component';
import {TimeSheetRoutingModule} from './time-sheet-routing';
import {NgxDocViewerModule} from 'ngx-doc-viewer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TimeSheetRoutingModule,
    NgxLoadingModule.forRoot({}),
    NgxPaginationModule,
    NgxDocViewerModule,


  ],
  declarations: [
    ViewFileComponent,
    ProgressComponent,
    FileUploadComponent,
    FileListComponent,

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
    FileService


  ]
})
export class TimeSheetModule {}
