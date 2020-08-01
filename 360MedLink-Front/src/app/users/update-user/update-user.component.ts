import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../providers/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../providers/auth.service';
import {AppToasterService} from '../../providers/toaster.service';
import {Employe} from '../../models/employe';
import {User} from '../../models/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  UserForm: FormGroup;
  userId: string;
  loading:boolean=false;
  managers:User[]=[];
  user:User;

  constructor( private formBuilder: FormBuilder,
               public  userService:UserService,
               private router:Router,
               private auth:AuthService,
               private toaster: AppToasterService,
               private route:ActivatedRoute) {
     this.userId = this.route.snapshot.paramMap.get('id');
     this.onGetManagers();
     this.onGetSingleUser(this.userId);
  }

  ngOnInit(): void {
    this.initUpdateForm();
  }
  initUpdateForm() {
    this.UserForm = this.formBuilder.group({
      contact: [''],
      firstName: [''],
      secondeName:[''],
      password:[''],
      birthday: ['',],
      salaire: [''],
      managerName: [''],
      cin: [''],
      rib: [''],
      adresse: [''],
      titre: [''],
    });
  }

  onUpdateUser(){
    let employe =new Employe();
    employe.contact      = this.UserForm.get('contact').value;
    employe.firstName    = this.UserForm.get('firstName').value;
    employe.secondeName  = this.UserForm.get('secondeName').value;
    employe.birthday     = this.UserForm.get('birthday').value;
    employe.salaire      = this.UserForm.get('salaire').value;
    employe.cin          = this.UserForm.get('cin').value;
    employe.rib          = this.UserForm.get('rib').value;
    employe.adresse      = this.UserForm.get('adresse').value;
    employe.managerName  = this.UserForm.get('managerName').value;
    employe.titre        = this.UserForm.get('titre').value;
    this.managers.forEach((manager)=>{
      if(manager.firstName===employe.managerName){
        employe.manager_id=manager.id
      }
    });
    this.userService.updateUser(employe,this.userId).subscribe(
      (res)=>{
      },
      (err)=>{
        this.loading=false;
        this.toaster.lunchErrorToast("Probléme de connectivité","Error");
      },
      ()=>{
        this.loading=false;
        this.router.navigateByUrl('/home/users')
      })
  }

  onGetManagers(){
    this.userService.getManagers().subscribe(
      (managers:User[])=>{
        this.managers=managers;
      },
      (err)=>{
        this.loading=false;
      },
      ()=>{
        this.loading=false;


      }
    )
  }

  onGetSingleUser(userId:string){
    this.loading=true;
    this.userService.getSingleUser(userId).subscribe(
      (data:User)=>{
        this.user=data;
        this.UserForm.setValue({firstName:this.user.firstName})
      },
      (err)=>{
        this.loading=false;
        console.log(err);
      },
      ()=>{
        this.loading=false;
        console.log("users are here")}
    )
  }


}
