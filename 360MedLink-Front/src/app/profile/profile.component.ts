import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppToasterService} from '../providers/toaster.service';
import {AuthService} from '../providers/auth.service';
import {ProfileService} from '../providers/profile.service';
import {User} from '../models/user';
import {CongeService} from '../providers/conge.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user:User;
  public loading = false;
  role:string="";

  constructor(private profile: ProfileService,
              private auth: AuthService,
              private  toaster: AppToasterService,
              private route: Router,
              private conge:CongeService) {
    this.role=this.auth.getRole(this.auth.loadToken());
  }

  ngOnInit(): void {
    this.loading=true;
    this.profile.getProfile().subscribe(
      (data: User) => {
        this.user = data;
        this.profile.saveUserID(data);
        this.profile.saveManagerID(data);
        this.profile.saveManagerName(data);

      },
      (err) => {
        this.loading=false;
      },
      () => {
        this.loading=false;
      }
    )
  }
  onDeleteProfile() {
    this.profile.deleteProfile().subscribe(
      (data: User) => {
      },
      (err) => {
        this.toaster.lunchErrorToast(err.error.message, "Connection  Error");
      },
      () => {
        this.auth.deleteLocalStorage();
        this.route.navigateByUrl("/login");
      }
    )
  }
}
