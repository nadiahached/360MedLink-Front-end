import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HostService} from './host.service';
import {LoginForm} from '../models/loginForm';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers= new HttpHeaders({ 'Content-Type':  'application/json'});
  private jwtToken:string=null;
  private role:string=null;

  constructor(private http:HttpClient,private host:HostService) { }

  login(loginForm:LoginForm){
    return this.http.post(this.host.host+"/login", JSON.stringify(loginForm),
      {headers:this.headers,observe: 'response'});
  }
  saveToken(jwt){
    localStorage.setItem('token',jwt);
  }
  loadToken(){
    return localStorage.getItem('token');
  }
  getRoleJwt(jwt):string{
    let roles :Array<string>= Array.from(JSON.parse(window.atob(jwt.split('.')[1])).roles);
    return this.extractRole(roles)
  }
  extractRole(roles:Array<string>) :string{
    if(roles.indexOf("ADMIN")!=-1){
      return "ADMIN"
    }else{
      if(roles.indexOf("MANAGER")!=-1){
        return"MANAGER";
      }else{
        if(roles.indexOf("RH")!=-1){
          return "RH";
        }
        else{
          return "USER";
        }

      }
    }
  }

  getRole(token){
    return this.getRoleJwt(token)
  }
  isTokenExpired(){
    const jwt=this.loadToken();
    if (!jwt)return true;
    const date = this.getTokenExpirationDate(jwt);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  getTokenExpirationDate(token: string): Date {
    let exp = JSON.parse(window.atob(token.split('.')[1])).exp;
    if (exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(exp);
    return date;
  }

  deleteLocalStorage(){
    localStorage.clear();
  }
}

