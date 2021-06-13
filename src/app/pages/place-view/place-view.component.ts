import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlacesService } from 'src/app/app/services/places.service';
import { AuthService } from 'src/app/auth/services/auth.service';
declare const google: any;

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
    this.comments = {};
    this.coordinates = {};
  }

  ngOnInit(){
    this.placesSvc.getPlacesReviews(this.value["placeID"]).subscribe(async results => {
      this.comments = results["result"]["reviews"];
      console.log(results);
      this.rating = results["result"]["rating"];
      this.coordinates = results["result"]["geometry"]["location"];
    });

    // -------------------------------

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
  }

  async placeToVisit(idPlace){
    let place = {"idLugar": idPlace, "rating": 0};
    await this.authSvc.addVisitedPlace(place);
  }

}
