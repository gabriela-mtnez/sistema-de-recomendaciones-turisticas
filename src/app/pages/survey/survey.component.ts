import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlacesService } from 'src/app/app/services/places.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  providers: [AuthService],
})
export class SurveyComponent implements OnInit {
  places$ = this.placesSvc.places;
  public selectedPlaces = [];
  
  constructor(private router:Router, private placesSvc: PlacesService, private authSvc:AuthService) { }

  ngOnInit(): void {
  }

  async onCreate(){
    //una vez que se envíe, pasar el array de selectedPlaces a register.component.ts para terminar de guardar los datos
    let selectedPlacesArray = [];
    for(let i = 0; i < this.selectedPlaces.length; i++){
      selectedPlacesArray.push({"idLugar": this.selectedPlaces[i], "rating": 5});
    }
    const register = await this.authSvc.registSelectedPlaces(selectedPlacesArray);
    //redirect (aquí debo redirigir a la búsqueda)
    this.router.navigate(['dashboard']);
  }

  clickCheckbox(idLugar: string) {
    if(this.selectedPlaces.includes(idLugar)){
      let indice = this.selectedPlaces.indexOf(idLugar);
      this.selectedPlaces.splice(indice, 1);
    } else {
      this.selectedPlaces.push(idLugar);
    }
  }

}
