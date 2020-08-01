import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {HostService} from './host.service';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private host:HostService,
              private auth:AuthService,
              private http:HttpClient) { }

  getProfile(){
    return this.http.get<User>(this.host.host+"/profile",{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})

  }
  deleteProfile(){
    return this.http.delete(this.host.host+"/profile",{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }

  saveUserID(user:User){
    localStorage.setItem('user_id',user.id.toString());
  }
  loadUserID(){
    return localStorage.getItem('user_id');
  }
  saveManagerName(user:User){
    localStorage.setItem('ManagerName',user.managerName);
  }
  loadManagerName(){
    return localStorage.getItem('ManagerName');
  }
  saveManagerID(user:User){
    localStorage.setItem('ManagerID',user.id.toString());
  }
  loadManagerID(){
    return localStorage.getItem('ManagerID');
  }
}
