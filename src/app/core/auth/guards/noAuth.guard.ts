import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad
{
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        // return this._check();
        // if (this._authService.loggedInStatus === true) {
        //     this._router.navigate(['']).then(r => r);
        //     return false;
        // }
        return true;
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        // return this._check();
        // if (this._authService.loggedInStatus === true) {
        //     this._router.navigate(['']).then(r => r);
        //     return true;
        // }
        return true;
    }

    /**
     * Can load
     *
     * @param route
     * @param segments
     */
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean
    {
        // return this._check();
        // if (this._authService.loggedInStatus === true) {
        //     this._router.navigate(['']).then(r => r);
        //     return false;
        // }
        return true;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @private
     */
    private _check(): Observable<boolean>
    {
        // Check the authentication status
        return this._authService.check()
                   .pipe(
                       switchMap((authenticated) => {
                           console.log(authenticated);
                           // If the user is authenticated...
                           if ( authenticated )
                           {
                               // Redirect to the root
                               this._router.navigate(['']).then(r => r);

                               // Prevent the access
                               return of(false);
                           }

                           // Allow the access
                           return of(true);
                       })
                   );
    }
}
