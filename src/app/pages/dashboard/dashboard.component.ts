import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PlacesService } from 'src/app/app/services/places.service';
import { NavigationExtras, Router } from '@angular/router';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [AuthService, PlacesService],
})
export class DashboardComponent implements OnInit {
  nota:number;
  recomendations: any;
  navigationExtras: NavigationExtras = {
    state: {
      place: null
    }
  }

  constructor(private authSvc:AuthService, private placesSvc:PlacesService, private router: Router) {
    this.nota=5;
    this.recomendations = {};
  }

  ngOnInit() {
  }

  async descubrirLugares(){
    const user = this.authSvc.getUserProfile();
    const places = await this.authSvc.getUserPlaces(user["email"]);
    var selectedPlacesId = places["data"]["selectedPlaces"];
    var selectedPlacesInfo = []; //places selected on the survey
    var placesInfo = [];
    for (let i = 0; i < selectedPlacesId.length; i++){
      let place = await this.placesSvc.getPlacesById(selectedPlacesId[i]["idLugar"]);
      if(place["tipoLugar"] == "Museo" || place["tipoLugar"] == "Sitio arqueológico"){
        selectedPlacesInfo.push({"lugar" : "Museos y sitios arqueológicos: [" + place["nombreLugar"] + "]", "rating": selectedPlacesId[i]["rating"]});
      } else {
        selectedPlacesInfo.push({"lugar" : "Restaurantes: [" + place["nombreLugar"] + "]", "rating": selectedPlacesId[i]["rating"]});
      }
    }
    this.placesSvc.callRecomendationsAlgorith(selectedPlacesInfo).subscribe(async recomendation => {
      for (let i = 0; i < recomendation["data"].length; i++){
        var auxString = recomendation["data"][i]["index"].replace('Museos y sitios arqueológicos: [', '');
        auxString = auxString.replace(']', '');
        auxString = auxString.replace('Restaurantes: [', '');
        recomendation["data"][i]["index"] = auxString;
        //Search image in DB
        let placeName = recomendation["data"][i]["index"];
        placesInfo.push(await this.placesSvc.getPlacesByName(placeName));
        let placeImageLink = placesInfo[i]["imagenLugar"] != undefined ? placesInfo[i]["imagenLugar"]: "";
        recomendation["data"][i].imagenLugar = placeImageLink;
      }
      this.recomendations = recomendation["data"];
      console.log(this.recomendations);
    });
  }

  async saberMas(placeName){
    let placeInfo = await this.placesSvc.getPlacesByName(placeName);
    //Cambiar de página y mostrar la info del lugar
    //enviar info del lugar
    this.navigationExtras.state.place = placeInfo;
    //Redirect to dashboard
    this.router.navigate(['placeview'], this.navigationExtras);
    console.log(placeInfo);
  }

  redirect(){
    //redirect
    this.router.navigate(['/icons']);
  }

}
