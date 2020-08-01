import { Injectable } from '@angular/core';
import {HostService} from './host.service';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Salary} from '../models/salary';
import {Conge} from '../models/conge';
import {ProfileService} from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  constructor(private host:HostService,
              private auth:AuthService,
              private http:HttpClient,
              private profile: ProfileService) {

  }

  getAppUserConge(){
    let role: string=this.auth.getRole(this.auth.loadToken());
    console.log(role);
    if(role==="RH"){
      return this.getRhConges()
    }else{
      if(role==="MANAGER"){
       return this.getManagerConges();
      }
    }
  }

  private getRhConges(){
    return this.http.get<Conge[]>(this.host.host+"/Conge/rh",{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
  private getManagerConges(){
    let id:string=this.profile.loadUserID();
    return this.http.get<Conge[]>(this.host.host+"/Conge/manager/"+id,{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }

  getUserConges(){
    let id:string=this.profile.loadUserID();
    return this.http.get<Conge[]>(this.host.host+"/Conge/user/"+id,{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }

  demanderConge(conge:Conge){
    return this.http.post<Conge>(this.host.host+"/Conge",{
         managerName:conge.managerName,
         idUser:conge.idUser,
         manager_id:conge.manager_id,
         debutTime:conge.debutTime,
         breJours:conge.breJours,
         firstName:conge.firstName,
         secondeName:conge.secondeName,
         titre:conge.titre
    },{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }

  approuveRhDemande(id:number){
    return this.http.post(this.host.host+"/Conge/rh/"+id.toString(),{},{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }

  approuveManagerDemande(id:number,userId:number){
    return this.http.post(this.host.host+"/Conge/manager/"+id.toString()+'/'+userId,{},{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
  blocManagerDemande(id:number){
    return this.http.post(this.host.host+"/Conge/bloc/manager/"+id.toString(),{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
}
