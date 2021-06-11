import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-landinng',
  templateUrl: './landinng.component.html',
  styleUrls: ['./landinng.component.css']
})
export class LandinngComponent implements OnInit {

  
  images: any[]= [
  {
  	name: 'México Magico',
  	img: 'assets/img/landing/img3.jpeg',
  	desc: 'Viajar por México es enamorarte a cada paso.'
  }, {
  	name: 'Baile tipico Mexicano',
  	img: 'assets/img/landing/img1.jpeg',
  	desc: 'Cuando los años pasen, recondarás tu vida y sabras si tomaste la mejor decisión.'
  }, {
  	name: 'Centro Historico',
  	img: 'assets/img/landing/img2.jpeg',
  	desc: 'Y la próxima vez que alguien te diga que traemos el nopal en la frente, dígale no, que más bien lo traemos en el corazón.'
  }, {
    name: 'Palacio de Bellas Artes',
    img: 'assets/img/landing/img6.jpeg',
    desc: 'Reconocido como el máximo recinto del arte en México.'
  },
  {
    name: 'Museo Soumaya.',
    img: 'assets/img/landing/img4.gif',
    desc: 'El Museo Soumaya tiene sus instalaciones divididas en 6 salas de exhibición'
  }

  ];

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  constructor() { }

  ngOnInit(): void {
  }
}


