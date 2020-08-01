import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../providers/profile.service';
import {AuthService} from '../providers/auth.service';
import {AppToasterService} from '../providers/toaster.service';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {SaleryService} from '../providers/salery.service';
import {Salary} from '../models/salary';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.scss']
})
export class SalariesComponent implements OnInit {
  UserSalaries:Salary[];
  user:User;
  total:number=0;
  loading = false;
  constructor(private profile: ProfileService,
              private auth: AuthService,
              private toaster: AppToasterService,
              private route: Router,
              private salary: SaleryService) {

    this.loading=true;
    this.profile.getProfile().subscribe(
      (data: User) => {
        this.user = data;
      },
      (err) => {
      },
      () => {
        this.onGetUSerSalaries(this.user.id);
      }
    )
  }

  ngOnInit(): void {
  }

  onGetUSerSalaries(id:number){
    this.salary.getUserSalaries(id).subscribe(
      (data: Salary[]) => {
        this.UserSalaries = data;
        console.log(this.UserSalaries);
      },
      (err) => {
        this.loading=false;
        console.log(err);
      },
      () => {
        this.loading=false;
        console.log("profile is here")
      }
    )
  }

  getTotalSalarie(){
    this.total=0;
    if(this.UserSalaries!=undefined){
      this.UserSalaries.forEach((salary)=>{
        this.total= parseFloat(salary.salary)+this.total
      });
    }
    return this.total;
  }
}
