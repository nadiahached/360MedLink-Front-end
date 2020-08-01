import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HostService} from '../providers/host.service';
import {AuthService} from '../providers/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user:User;
  role:string;
  constructor(private host:HostService,
              private auth:AuthService,
              private http:HttpClient,
              private router:Router) {
    this.getProfile();
    this.role=this.auth.getRole(this.auth.loadToken());
  }

  ngOnInit(): void {

  }
  getProfile(){
    this.http.get<User>(this.host.host+"/profile",{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})}).subscribe(
      (data: User) => {
        this.user = data;
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log("profile is here")
      }
    )

  }
  onLogout(){
    this.auth.deleteLocalStorage();
    this.router.navigateByUrl('login')
  }
}
