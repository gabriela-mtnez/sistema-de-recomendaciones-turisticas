import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {

  private isEmail = /\S+@\S+\.\S+/;

  registerForm = new FormGroup({
    name : new FormControl(''),
    surname : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    birthday : new FormControl(''),
  })

  constructor(private authSvc:AuthService, private router:Router, private fb:FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  async onRegister(){
    const {name, surname,email, password, birthday} = this.registerForm.value;
    try{
      const user = await this.authSvc.register(email, password);
      if(user){
        //redirect (aquí debo redirigir a la encuesta de gustos)
        this.router.navigate(['dashboard']);
      }
    } catch (error) {
      console.log(error);
    }

    if(this.registerForm.valid){
      this.authSvc.registerUser(name, surname,email, password, birthday);
    }
  }

  private initForm():void{
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
    })
  }

}
