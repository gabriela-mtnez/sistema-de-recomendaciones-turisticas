import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlacesService } from 'src/app/app/services/places.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-place-view',
  templateUrl: './place-view.component.html',
  styleUrls: ['./place-view.component.css'],
  providers: [AuthService, PlacesService]
})
export class PlaceViewComponent implements OnInit {
  value = null;

  constructor(private router: Router, private authSvc:AuthService) { 
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state?.place;
  }

  ngOnInit(): void {
  }

  async placeToVisit(idPlace){
    let place = {"idLugar": idPlace, "rating": 0};
    await this.authSvc.addVisitedPlace(place);
  }

}
