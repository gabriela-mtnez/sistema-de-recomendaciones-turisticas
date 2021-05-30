import { Component, OnInit } from '@angular/core';
declare const google: any;
import { AuthService } from 'src/app/auth/services/auth.service';
import { PlacesService } from 'src/app/app/services/places.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  providers: [AuthService, PlacesService],
})
export class MapsComponent implements OnInit {

  recomendations: any;
  rating: string = '';

  constructor(private authSvc:AuthService, private placesSvc:PlacesService, private router: Router) { 
    this.recomendations = {};
  }

  async ngOnInit() {
    let map = document.getElementById('map-canvas');
    let lat = map.getAttribute('data-lat');
    let lng = map.getAttribute('data-lng');

    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 12,
        scrollwheel: false,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},
          {"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},
          {"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
          {"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},
          {"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},
          {"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
          {"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
          {"featureType":"water","elementType":"all","stylers":[{"color":'#5e72e4'},{"visibility":"on"}]}]
    }

    map = new google.maps.Map(map, mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Hello World!'
    });

    var contentString = '<div class="info-window-content"><h2>Argon Dashboard</h2>' +
        '<p>A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</p></div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });

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
