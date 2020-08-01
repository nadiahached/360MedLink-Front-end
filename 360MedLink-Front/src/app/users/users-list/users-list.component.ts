import { Component, OnInit } from '@angular/core';
import {AppToasterService} from '../../providers/toaster.service';
import {UserService} from '../../providers/user.service';
import {AuthService} from '../../providers/auth.service';
import {NavigationEnd, Router} from '@angular/router';
import {User} from '../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Employe} from '../../models/employe';
declare var jQuery:any;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  loading = false;
  users:User[]=[];
  managers:User[]=[];
  pageNumber :number=1;
  hidden: boolean=false;
  userName:string='';
  UserForm: FormGroup;

  constructor(private  formBuilder: FormBuilder,
              public   userService:UserService,
              private  route:Router,
              private  auth:AuthService,
              private  toaster: AppToasterService,
              private  router:Router) {

    this.router.events.subscribe((res)=>{
      if(res instanceof NavigationEnd){
        if(res['url']!='/home/users'){
          this.hidden=true
        }else{
          this.onGetUsers();
          this.hidden=false;
        }
      }
    });
    this.onGetManagers();
  }
  ngOnInit(): void {
    this.initAddUser()
  }

  onGetUsers(){
    this.loading=true;
    this.userService.getUsers().subscribe(
      (data:User[])=>{
        this.users=data;
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
  findUsers(){
    if(this.userName!=''){
         this.loading=true;
         this.userService.chercherUser(this.userName).subscribe(
           (data:User[])=>{
             this.users=data;
           },
           (err)=>{
             this.loading=false;
             console.log(err);
           },
           ()=>{
             this.loading=false;
             console.log("users are here")}
         )
    }else{
      this.toaster.lunchInfoToast("donner le nom du l'employé à rechercher","notification")
      this.onGetUsers();
    }
  }
  initAddUser(){
    this.UserForm = this.formBuilder.group({
      email:['',Validators.email],
      contact: [''],
      firstName: [''],
      secondeName:[''],
      birthday: ['',],
      salaire: [''],
      cin: [''],
      rib: [''],
      managerName:[''],
      adresse: [''],
      titre: [''],
      password:[''],
      cota:[''],
    });
  }
  onAddUser(){
    let employe =new Employe();
    employe.email      = this.UserForm.get('email').value;
    employe.contact      = this.UserForm.get('contact').value;
    employe.firstName    = this.UserForm.get('firstName').value;
    employe.secondeName  = this.UserForm.get('secondeName').value;
    employe.birthday     = this.UserForm.get('birthday').value;
    employe.salaire      = this.UserForm.get('salaire').value;
    employe.cin          = this.UserForm.get('cin').value;
    employe.managerName  = this.UserForm.get('managerName').value;
    employe.rib          = this.UserForm.get('rib').value;
    employe.adresse      = this.UserForm.get('adresse').value;
    employe.titre        = this.UserForm.get('titre').value;
    employe.password     = this.UserForm.get('password').value;
    employe.cota     = Number(this.UserForm.get('cota').value);
    employe.rejoint_time     =new Date(Date.now()).toISOString().slice(0,10);
    console.log(employe);
    this.managers.forEach((manager)=>{
      if(manager.firstName===employe.managerName){
        employe.manager_id=manager.id
      }
    });

    this.loading=true;
    this.userService.addUser(employe).subscribe(
      ()=>{
      },
      (err)=>{
        this.loading=false;
        this.toaster.lunchErrorToast("Impossible d'ajouter ce  utilisateur","Error");
      },
      ()=>{
        this.loading=false;
        jQuery("#AddUser").modal("hide");
        this.onGetUsers();


      }
    )
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

  onDeleteUser(id:number){
    this.loading=true;
    this.userService.deleteUser(id).subscribe(
      ()=>{
      },
      (err)=>{
        console.log(err);
        this.loading=false;
        this.toaster.lunchErrorToast("Impossible de supprimer ce  utilisateur","Error");
      },
      ()=>{
        this.loading=false;
        jQuery("#delete-"+id.toString()).modal("hide");
        this.onGetUsers();
        this.toaster.lunchSuccessToast("ce utilisateur  est supprimé","Success");



      }
    )
  }

}
