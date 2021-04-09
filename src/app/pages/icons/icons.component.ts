import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlacesService } from 'src/app/app/services/places.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  places$ = this.placesSvc.places;
  public copy: string;
  constructor(private placesSvc: PlacesService) { }

  ngOnInit() {
  }
}
