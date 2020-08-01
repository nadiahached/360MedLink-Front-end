import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule} from '@angular/common/http';
import { NgxLoadingModule} from 'ngx-loading';
import { ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppToasterService} from './providers/toaster.service';
import { HostService} from './providers/host.service';
import { AuthService} from './providers/auth.service';
import { ProfileService} from './providers/profile.service';
import { SaleryService} from './providers/salery.service';
import { BillingService} from './providers/billing.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxDocViewerModule} from 'ngx-doc-viewer';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,
    HeaderComponent,
    HomeComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    NgxLoadingModule.forRoot({}),
    NgxPaginationModule,
    NgxDocViewerModule,


  ],
  providers: [
    AuthService,
    HostService,
    AppToasterService,
    ProfileService,
    SaleryService,
    BillingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
