import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PlacesService } from 'src/app/app/services/places.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  providers: [AuthService],
})
export class MapsComponent implements OnInit {

  recomendations: any;
  rating: string = '';

  constructor(private authSvc:AuthService, private placesSvc:PlacesService, private router: Router) { 
    this.recomendations = {};
  }

  async ngOnInit() {
    const user = this.authSvc.getUserProfile();
    const places = await this.authSvc.getUserPlaces(user["email"]);
    //selectedPlacesId tiene el id y calificación que dio el usuario a un lugar
    var selectedPlacesId = places["data"]["selectedPlaces"];
    var selectedPlacesInfo = [];
    for (let i = 0; i < selectedPlacesId.length; i++){
      selectedPlacesInfo.push(await this.placesSvc.getPlacesById(selectedPlacesId[i]["idLugar"]));
      selectedPlacesInfo[i]["rating"] = selectedPlacesId[i]["rating"];
    }
    this.recomendations = selectedPlacesInfo;
  }

  async evaluarLugar(rating, i){
    this.rating = rating.target.value;
    const user = this.authSvc.getUserProfile();
    const places = await this.authSvc.getUserPlaces(user["email"]);
    //selectedPlacesId tiene el id y calificación que dio el usuario a un lugar
    var selectedPlacesId = places["data"]["selectedPlaces"];
    selectedPlacesId[i]["rating"] = parseInt(this.rating);
    const ratings = await this.authSvc.setRatingVisitedPlace(selectedPlacesId);
  }

}
