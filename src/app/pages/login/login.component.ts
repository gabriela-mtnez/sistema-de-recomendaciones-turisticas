import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm  = new FormGroup ({
    email : new FormControl(''),
    password : new FormControl(''),
  })
  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit() {
  }

  async onLogin(){
    const {email, password} = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password);
      if (user){
        //Redirect to dashboard
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
  }

}
