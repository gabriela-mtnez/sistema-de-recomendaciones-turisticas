import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService],
})
export class NavbarComponent implements OnInit {
  public isLogged = false;
  public focus;
  public listTitles: any[];
  public location: Location;
  userInfo: any;
  constructor(location: Location,  private element: ElementRef, private router: Router, private authSvc:AuthService) {
    this.location = location;
    this.userInfo = {
      name : '',
      surname : '',
      email: '',
      gender: '',
      birthday: '',
      password: ''
    };
  }

  async ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const user = await this.authSvc.getCurrentUser();
    if (user) {
      this.isLogged = true;
    }

    const basicUserData = this.authSvc.getUserProfile();
    this.userInfo = await this.authSvc.getUserPlaces(basicUserData["email"]);
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  async onLogout() {
    try {
      await this.authSvc.logout();
      //redirect
      this.router.navigate(['/register']);
    } catch (error) {
      console.log(error);
    }
  }

}
