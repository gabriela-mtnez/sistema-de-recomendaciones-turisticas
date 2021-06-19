import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PlacesService } from 'src/app/app/services/places.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [AuthService, PlacesService]
})
export class UserProfileComponent implements OnInit {
  public isLogged = false;
  userInfo: any;
  state = true;
  mostrar_guardar = true;
  mostrar_editar = false;

  saveForm = new FormGroup({
    name : new FormControl(''),
    surname : new FormControl(''),
    password : new FormControl(''),
  })

  constructor(private authSvc:AuthService, private placesSvc:PlacesService, private router: Router, private fb:FormBuilder) {
    this.userInfo = {
      name : '',
      surname : '',
      email: '',
      gender: '',
      birthday: '',
      password: ''
    };
   }

  async ngOnInit() {
    const login = await this.authSvc.getCurrentUser();
    if (login) {
      this.isLogged = true;
    }
    if(this.isLogged){
      const basicUserData = this.authSvc.getUserProfile();
      const user = await this.authSvc.getUserPlaces(basicUserData["email"]);
      var date =  user["birthday"]["day"] + "/" +  user["birthday"]["month"] + "/" +  user["birthday"]["year"];
      this.userInfo = {
        name : user["name"],
        surname : user["surname"],
        email: user["email"],
        gender: user["gender"],
        birthday: date,
        password: user["password"]
      };
    } else {
      //redirect
      this.router.navigate(['/register']);
    }
    
  }

    onUpdate(){
    //Des-habilitar botones a editar.
    this.state = !this.state;

    this.mostrar_guardar = !this.mostrar_guardar;
    this.mostrar_editar = !this.mostrar_editar;

    //Habilitar btn guardar
    //this.mostrar_guardar = !this.mostrar_guardar;
  }

  async onSave(nombre, apellido, contrasenia) {
    this.authSvc.editUser(nombre, apellido, contrasenia);
    this.router.navigate(['/user-profile']);

    //Des-habilitar botones a editar.
    this.state = !this.state;
    this.mostrar_guardar = !this.mostrar_guardar;
    this.mostrar_editar = !this.mostrar_editar;

    //Habilitar btn guardar
    //this.mostrar_guardar = !this.mostrar_guardar;
  }
}
