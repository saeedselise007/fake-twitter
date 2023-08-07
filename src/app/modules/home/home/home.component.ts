import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  mobileQuery: MediaQueryList;

  public navLists= [
    {
      url: '/home',
      name: 'Home',
      icon: 'home',
    },
    {
      url: '/home/user',
      name: 'Profile',
      icon: 'person',
    },
    {
      url: '/home/explore',
      name: 'explore',
      icon: 'explore',
    }
  ];

  public _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              public authService: AuthService,
              private _router: Router) {
    console.log(this.authService.authInfo.id);
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    localStorage.clear();
    this._router.navigateByUrl('/sign-in').then(r => r);

  }
  signin() {
    this._router.navigateByUrl('/sign-in').then(r => r);
  }
}
