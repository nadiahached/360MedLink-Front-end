import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HostService} from './host.service';
import {AuthService} from './auth.service';
import {Salary} from '../models/salary';

@Injectable({
  providedIn: 'root'
})
export class SaleryService {

  constructor(private host:HostService,
              private auth:AuthService,
              private http:HttpClient) { }

  getUserSalaries(id:number){
    return this.http.get<Salary[]>(this.host.host+"/salary/user/"+id.toString(),{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
  payAuser(salary:Salary){
    return this.http.post<Salary>(this.host.host+"/salary",salary,{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
  GetAllSalaries(){
    return this.http.get<Salary[]>(this.host.host+"/salary",{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
  deleteSalary(id:number){
    return this.http.delete(this.host.host+"/salary/"+id.toString(),{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }

}
