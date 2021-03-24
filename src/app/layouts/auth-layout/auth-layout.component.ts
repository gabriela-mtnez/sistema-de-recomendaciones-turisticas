import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
//

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  providers: [AuthService],
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  public user$: Observable<any> = this.authSvc.afAuth.user;
  test: Date = new Date();
  public isCollapsed = true;

  constructor(private router: Router, private authSvc:AuthService) { }

  async ngOnInit() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  ngOnDestroy() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
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
