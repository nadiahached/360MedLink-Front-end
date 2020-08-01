import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {HostService} from './host.service';
import {User} from '../models/user';
import {Employe} from '../models/employe';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private host:HostService,
              private auth:AuthService,
              private http:HttpClient) { }
  getUsers(){
    return this.http.get<User[]>(this.host.host+"/users",{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken(),"Content-Type":"application/json"})})

  }
  updateUser(employe:Employe,id:string){
    return this.http.put<Employe>(this.host.host+"/employe/"+id.toString(), {
      "contact":employe.contact,
      "firstName":employe.firstName,
      "secondeName":employe.secondeName,
      "birthday":employe.birthday,
      "salaire":employe.salaire,
      "cin":employe.cin,
      "rib":employe.rib,
      "adresse":employe.adresse,
      "managerName":employe.managerName,
      "manager_id":employe.manager_id,
      "titre":employe.titre
    },{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
  addUser(employe:Employe){
    return this.http.post<Employe>(this.host.host+"/employe",employe,{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
  chercherUser(userName:string){
    return this.http.get<User[]>(this.host.host+"/employe/"+userName,{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
  getManagers(){
    return this.http.get<User[]>(this.host.host+"/employe/titre/MANAGER",{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
  getSingleUser(id:string){
    return this.http.get<User>(this.host.host+"/employe/details/"+id,{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
  deleteUser(id:number){
    return this.http.delete(this.host.host+"/employe/"+id.toString(),{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
  deleteRole(role:string,userName:string){
    return this.http.delete(this.host.host+"/users/access/"+userName+"/"+role,{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
  addRole(role:string,userName:string){
    return this.http.post<any>(this.host.host+"/users/access/"+userName+"/"+role,{},{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()}) })
  }
}
