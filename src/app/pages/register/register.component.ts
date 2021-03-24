import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
  })

  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit() {
  }

  async onRegister(){
    const {email, password} = this.registerForm.value;
    try{
      const user = await this.authSvc.register(email, password);
      if(user){
        //redirect (aquí debo redirigir a la encuesta de gustos)
        this.router.navigate(['dashboard']);
      }
    } catch (error) {
      console.log(error);
    }
  }

}
