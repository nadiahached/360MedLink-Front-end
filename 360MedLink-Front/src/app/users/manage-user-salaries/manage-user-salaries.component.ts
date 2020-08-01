import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../providers/auth.service';
import {AppToasterService} from '../../providers/toaster.service';
import {Salary} from '../../models/salary';
import {SaleryService} from '../../providers/salery.service';
import {ProfileService} from '../../providers/profile.service';
import {User} from '../../models/user';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {UserService} from '../../providers/user.service';
declare var jQuery:any;

@Component({
  selector: 'app-manage-user-salaries',
  templateUrl: './manage-user-salaries.component.html',
  styleUrls: ['./manage-user-salaries.component.scss']
})
export class ManageUserSalariesComponent implements OnInit {
  loading:boolean=false;
  userId: string;
  UserSalaries:Salary[];
  total:number=0;
  user:User;
  SalaryForm: FormGroup;

  constructor(private router:Router,
              private auth:AuthService,
              private toaster: AppToasterService,
              private route:ActivatedRoute,
              private salary: SaleryService,
              private profile: ProfileService,
              private formBuilder: FormBuilder,
              public  userService:UserService,) {

    this.userId = this.route.snapshot.paramMap.get('id');
    this.loading=true;
    this.onGetSingleUser(this.userId);
    this.initAddSalary()

  }

  ngOnInit(): void {
  }
  initAddSalary(){
    this.SalaryForm = this.formBuilder.group({
      salary:['',[Validators.required]],
      date: ['',[Validators.required]],
    });
  }
  onGetSingleUser(userId:string){
    this.loading=true;
    this.userService.getSingleUser(userId).subscribe(
      (data:User)=>{
        this.user=data;
      },
      (err)=>{
        this.loading=false;
        console.log(err);
      },
      ()=>{
        this.loading=false;
        this.onGetUSerSalaries(Number(this.userId));
        console.log("users are here")}
    )
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
  onAddSalary(){
    let salary =new Salary();
    salary.salary      = this.SalaryForm.get('salary').value;
    salary.date      = this.SalaryForm.get('date').value;
    salary.iduser    =Number(this.userId);
    salary.titre    =this.user.titre;
    this.salary.payAuser(salary).subscribe(
      (res) => {

      },
      (err) => {
        this.loading=false;
        console.log(err);
      },
      () => {
        this.loading=false;
        jQuery("#AddSalary").modal("hide");

        this.onGetUSerSalaries(Number(this.userId));
      }
    )
  }
  onDeleteSalary(id:number){
    this.loading=true;
    this.salary.deleteSalary(id).subscribe(
      (res) => {

      },
      (err) => {
        this.loading=false;
        console.log(err);
      },
      () => {
        this.loading=false;
        this.onGetUSerSalaries(Number(this.userId));
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
