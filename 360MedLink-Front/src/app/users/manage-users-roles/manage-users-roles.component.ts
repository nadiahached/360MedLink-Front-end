import { Component, OnInit } from '@angular/core';
import {role, User} from '../../models/user';
import {FormGroup} from '@angular/forms';
import {UserService} from '../../providers/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../providers/auth.service';
import {AppToasterService} from '../../providers/toaster.service';

@Component({
  selector: 'app-manage-users-roles',
  templateUrl: './manage-users-roles.component.html',
  styleUrls: ['./manage-users-roles.component.scss']
})
export class ManageUsersRolesComponent implements OnInit {
  loading = false;
  users:User[]=[];
  pageNumber :number=1;
  hidden: boolean=false;
  userName:string='';
  role:string="";
  constructor( public   userService:UserService,
               private  route:Router,
               private  auth:AuthService,
               private  toaster: AppToasterService,
               private  router:Router) {
    this.onGetUsers();
  }

  ngOnInit(): void {
  }

  onGetUsers(){
    this.loading=true;
    this.userService.getUsers().subscribe(
      (data:User[])=>{
        this.users=data;
        console.log(this.users)
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

  OndeleteRole(role:string,userName:string){
    this.loading=true;
    this.userService.deleteRole(role,userName).subscribe(
      (res)=>{
        console.log(res)
      },
      (err)=>{
        this.loading=false;
        this.toaster.lunchErrorToast("vous ne pouvez pas supprimer ce role","Error");
        console.log(err);
      },
      ()=>{
        this.loading=false;
        this.toaster.lunchSuccessToast("le role est supprimé avec succssé","success");
        this.onGetUsers();
        this.onGetUsers();
      }
    )
  }
  affecRole(evnet){
    this.role= evnet.target.value
  }
  onAddRole(userName:string){
    if(this.role!=""){
      this.loading=true;
      this.userService.addRole(this.role,userName).subscribe(
        ()=>{
        },
        (err)=>{
          this.loading=false;
          this.toaster.lunchErrorToast("vous ne pouvez pas ajouter ce role","Error");
          console.log(err);
        },
        ()=>{
          this.toaster.lunchSuccessToast("le role "+this.role+" est  ajouté avec succssé","success");
          this.loading=false;
          this.onGetUsers();
        }
      )
    }else{
      this.toaster.lunchInfoToast("Selectionner le role à ajouter","Info")
    }

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
  DisplayRole(roles:Array<role>){
    let returnedRoles:Array<string>=[];
    roles.forEach(role=>{
        returnedRoles.push(role.roleName);
    });
    return this.auth.extractRole(returnedRoles)
  }
}
