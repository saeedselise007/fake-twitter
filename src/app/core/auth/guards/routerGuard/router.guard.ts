import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouterGuard implements CanActivate {
    forGuestUser = [
        {url: '/sign-in'},
        {url: '/register'},
    ];
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router
    ){}
  // @ts-ignore
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this._authService.loggedInStatus === true) {
          // @ts-ignore
        this.forGuestUser.forEach( (res) => {
              if(state.url === res.url){
                  this._router.navigate(['home']).then(r => r);
                  return false ;
              }
          });
      }else {
          return true;
      }
  }
}
