import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import {debounceTime, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad
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
        // const redirectUrl = state.url === '/' ? '/' : state.url;
        // console.log(redirectUrl);
        // return this._check(redirectUrl);
        if (this._authService.loggedInStatus === true) {
            return true;
        }
        this._router.navigate(['/sign-in']).then(r => r);
        return false;
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        // const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        // return this._check(redirectUrl);
        // if (this._authService.loggedInStatus === true) {
        //     console.log('sami');
        //     this._router.navigate(['']).then(r => r);
        //     return false;
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
        // return this._check('/');
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
     * @param redirectURL
     * @private
     */
    private _check(redirectURL: string): Observable<any>
    {
        // Check the authentication status
        // this._authService.check().subscribe( (res) => {
        //     console.log(res);
        //     // If the user is not authenticated...
        //                        if ( res )
        //                        {
        //                            // Redirect to the sign-in page
        //                            this._router.navigate(['sign-in'], {queryParams: {redirectURL}}).then(r => r);
        //
        //                            // Prevent the access
        //                            return of(false);
        //                        }
        //
        //                        // Allow the access
        //                        return of(true);
        // });
        return this._authService.check()
                   .pipe(
                       switchMap((authenticated) => {
                           // If the user is not authenticated...
                           if ( authenticated )
                           {
                               // Redirect to the sign-in page
                               this._router.navigate(['sign-in'], {queryParams: {redirectURL}});

                               // Prevent the access
                               return of(false);
                           }

                           // Allow the access
                           return of(true);
                       })
                   );
    }
}
