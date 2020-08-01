import { Component, OnInit } from '@angular/core';
import {HostService} from '../providers/host.service';
import {AuthService} from '../providers/auth.service';
import {HttpClient} from '@angular/common/http';
import {CongeService} from '../providers/conge.service';
import {Conge} from '../models/conge';
import {AppToasterService} from '../providers/toaster.service';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.scss']
})
export class CongeComponent implements OnInit {
  conges:Conge[];
  loading :boolean=false;
  role:string;
  constructor(private host :HostService,
              private auth :AuthService,
              private http :HttpClient,
              private  toaster: AppToasterService,
              private conge:CongeService) {
    this.role=this.auth.getRole(this.auth.loadToken());
    console.log(this.role);
  }
  ngOnInit(): void {
    this.onGetConges();

  }
  onGetConges(){
    this.conge.getAppUserConge().subscribe(
      (data:Conge[])=>{
        this.conges=data;
        console.log(this.conges)},
      (err) => {
        this.toaster.lunchErrorToast(err.error.message, "Connection  Error")},
      ()=>{}
    );
  }
  onApprouveConge(id:number){
    this.conge.approuveRhDemande(id).subscribe(
      ()=>{},
      (err) => {
        this.toaster.lunchErrorToast(err.error.message, "Connection  Error")},
      ()=>{
        this.toaster.lunchSuccessToast('Congé est approuvée','success');
        this.onGetConges();
      }
    );
  }

  onApprouveManagerConge(id:number,userId:number){
    this.conge.approuveManagerDemande(id,userId).subscribe(
      ()=>{},
      (err) => {
        this.toaster.lunchErrorToast(err.error.message, "Connection  Error")},
      ()=>{
        this.toaster.lunchSuccessToast('Congé est approuvée','success');
        this.onGetConges();
      }
    );
  }
  onBlocManagerConge(id:number){
    this.conge.blocManagerDemande(id).subscribe(
      ()=>{},
      (err) => {
        this.toaster.lunchErrorToast(err.error.message, "Connection  Error")},
      ()=>{
        this.toaster.lunchSuccessToast('Congé est annulé','success');
        this.onGetConges();
      }
    );
  }


}
