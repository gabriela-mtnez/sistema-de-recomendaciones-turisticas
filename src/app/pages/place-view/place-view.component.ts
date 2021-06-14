import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlacesService } from 'src/app/app/services/places.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import {AfterViewInit} from '@angular/core';
// declare const google: any;
import {} from 'googlemaps';

@Component({
  selector: 'app-place-view',
  templateUrl: './place-view.component.html',
  styleUrls: ['./place-view.component.scss'],
  providers: [AuthService, PlacesService]
})
export class PlaceViewComponent implements OnInit {
  value = null;
  comments : any;
  rating = '';
  coordinates: any;

  constructor(private router: Router, private authSvc:AuthService, private placesSvc:PlacesService) { 
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state?.place;
    this.comments = [];
    this.coordinates = {};
  }

  async ngOnInit() {
    const DSLScript = document.createElement('script');
    DSLScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDSTS4TzrzallQIpq9dJhnfeYc2DibuXeA&libraries=places'; // replace by your API key
    DSLScript.type = 'text/javascript';
    document.body.appendChild(DSLScript);


    const results = await this.placesSvc.getPlacesReviews(this.value["placeID"]).toPromise();
    this.comments = results["result"]["reviews"];
    this.rating =  results["result"]["rating"];
    this.coordinates =  results["result"]["geometry"]["location"];
    
    let map: google.maps.Map;
    let infowindow: google.maps.InfoWindow;
    const myLatLng = { lat: this.coordinates["lat"], lng: this.coordinates["lng"] };

    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(document.getElementById("map-canvas") as HTMLElement, {
      center: myLatLng,
      zoom: 15,
    });

    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "VIVA TURISMO",
    });
  }

  async placeToVisit(idPlace){
    let place = {"idLugar": idPlace, "rating": 0};
    await this.authSvc.addVisitedPlace(place);
  }

}
