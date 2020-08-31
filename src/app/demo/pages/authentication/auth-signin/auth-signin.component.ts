import { AdminService } from './../../../../admin.service';
import { AdminData } from './../../../../modele/AdminData';
import { LoginService } from './../../../../login.service';
import { LoginData } from './../../../../modele/LoginData';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  data: LoginData;
 data1:AdminData;
 public btnLoader: boolean;
 public submitLoader: boolean;
  constructor(private loginService: LoginService, private router: Router,private usersAdmin:AdminService) {
    this.data = new LoginData('', '');
    this.btnLoader = false;
    this.submitLoader = false;

 }

  ngOnInit():void {
  }

  onConnectionSubmit() {
    this.loginService.LoginRequest(this.data)
      .subscribe(rest => {
        this.loginService.saveToken(rest);
        if (rest.authorities[0].authority == 'ROLE_ADMINISTRATEUR') {
          this.onSubmitLoader()
          this.router.navigate(['/dashboard']);
        }
        else{
          this.onSubmitLoader()
          this.router.navigate(['/dashboard/default/basic/button']);
        }
      },
        err => console.log(err)
      )
    
  }


  onSubmitLoader() {
    this.submitLoader = true;
    setTimeout(() => {
      this.submitLoader = false;
    }, 2000);
  }
}
