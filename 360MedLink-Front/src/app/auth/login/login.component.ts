import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppToasterService} from '../../providers/toaster.service';
import {AuthService} from '../../providers/auth.service';
import {Router} from '@angular/router';
import {LoginForm} from '../../models/loginForm';
import {ProfileService} from '../../providers/profile.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public loading = false;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth:AuthService,
              private toaster:AppToasterService,
              private profile: ProfileService,) { }

  ngOnInit(): void {
    this.initloginForm();
  }
  initloginForm() {
    this.loginForm = this.formBuilder.group({

      username:['',[Validators.required,Validators.email]],
      password: ['',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{4,}/)]]

    });
  }
  onLogin() {
    let form= new LoginForm();
    form.username = this.loginForm.get('username').value;
    form.password = this.loginForm.get('password').value;
    this.loading =true;

    this.auth.login(form).subscribe(
      (res)=>{
        let jwt=res.headers.get('Authorization');
        this.auth.saveToken(jwt);
      },
      (err) => {
        this.loading = false;
        console.log(err);
        this.toaster.lunchErrorToast("Echec de connexion","Connexion");
      },
      ()=>{
        this.loading = false;
        this.toaster.lunchSuccessToast("Bienvenu","Access");
        this.router.navigateByUrl('/home')
        // this.choseNavigation();
      }
    );
  }
  onGetSaveUserId(){
    this.profile.getProfile().subscribe(
      (data: User) => {
      },
      (err) => {
        this.loading=false;
      },
      () => {
        this.loading=false;
      }
    )
  }

  choseNavigation(){
    let role:string=this.auth.getRole(this.auth.loadToken());
    console.log(role);
    switch (role){
      case "Admin":
        this.router.navigateByUrl("/admin/products");
        break;
      case "Client":
        this.router.navigateByUrl("/products");
        break;
      case "Municipality":
        this.router.navigateByUrl("/mcommande");
        break;
      case "Delivery_man":
        this.router.navigateByUrl("/delevery/commande");
        break;
      default:
        this.toaster.lunchErrorToast("Veuillez vous connecter","Access");
        break;
    }


  }
}
