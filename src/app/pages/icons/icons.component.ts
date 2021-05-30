import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlacesService } from 'src/app/app/services/places.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state: {
      place: null
    }
  }

  places$ = this.placesSvc.places;
  public copy: string;
  constructor(private placesSvc: PlacesService, private router: Router) { }

  ngOnInit() {
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
