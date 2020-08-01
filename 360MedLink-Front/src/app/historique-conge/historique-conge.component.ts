import { Component, OnInit } from '@angular/core';
import {HostService} from '../providers/host.service';
import {AuthService} from '../providers/auth.service';
import {HttpClient} from '@angular/common/http';
import {AppToasterService} from '../providers/toaster.service';
import {CongeService} from '../providers/conge.service';
import {Conge} from '../models/conge';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/user';
import {ProfileService} from '../providers/profile.service';
import {Salary} from '../models/salary';
declare var jQuery:any;

@Component({
  selector: 'app-historique-conge',
  templateUrl: './historique-conge.component.html',
  styleUrls: ['./historique-conge.component.scss']
})
export class HistoriqueCongeComponent implements OnInit {
  conges:Conge[];
  CongeForm: FormGroup;
  user:User;
  loading:boolean=false;
  constructor(private host :HostService,
              private auth :AuthService,
              private http :HttpClient,
              private  toaster: AppToasterService,
              private conge:CongeService,
              private  formBuilder: FormBuilder,
              private profile: ProfileService,) {
    this.OnGetUserConge();
    this.onGetProfile();

  }

  ngOnInit(): void {
    this.initAddConge();
  }
  OnGetUserConge(){
    this.loading=true;
    this.conge.getUserConges().subscribe(
      (data:Conge[])=>{
        this.conges=data;
        this.loading=false;
        console.log(data);},
      (err) => {
        this.loading=false;
        this.toaster.lunchErrorToast(err.error.message, "Connection  Error")},
      ()=>{
        this.loading=false;

      }
    );
  }
  initAddConge(){
    this.CongeForm = this.formBuilder.group({
      debutTime:['',[Validators.required]],
      breJours: ['',[Validators.required]],
    });
  }
  onGetProfile(){
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

  onAddConge(){
    let conge =new Conge();
    conge.debutTime  = this.CongeForm.get('debutTime').value;
    conge.breJours   = Number(this.CongeForm.get('breJours').value);
    conge.idUser     = Number(this.user.id);
    conge.titre      = this.user.titre;
    conge.managerName= this.user.managerName;
    conge.manager_id = this.user.manager_id;
    conge.firstName  = this.user.firstName;
    conge.secondeName= this.user.secondeName;
    conge.titre      = this.user.titre;
    if(conge.breJours<=this.user.solde){
      this.loading=true;
      this.conge.demanderConge(conge).subscribe(
        (data:Conge)=>{
          this.loading=false;},
        (err) => {
          this.loading=false;
          this.toaster.lunchErrorToast(err.error.message, "Connection  Error")},
        ()=>{
          jQuery("#AddConge").modal("hide");
          this.toaster.lunchSuccessToast( "Congé ajouter avec success","Connection  Error");
          this.OnGetUserConge();
          this.loading=false;});
    }else{
      this.toaster.lunchErrorToast("Vous n'avez pas suffisament de solde congé", "Error")
    }

  }

}
