import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class AuthService
{
    public userLogInStatus = new BehaviorSubject(false);
    private _authenticated: boolean = false;
    private readonly _baseUrl;
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        // private _snackBar: MatSnackBar
        // private _userService: UserService
    )
    {
        this._baseUrl = environment.baseUrl;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // /**
    //  * Forgot password
    //  *
    //  * @param email
    //  */
    // forgotPassword(email: string): Observable<any>
    // {
    //     return this._httpClient.post('api/auth/forgot-password', email);
    // }
    //
    // /**
    //  * Reset password
    //  *
    //  * @param password
    //  */
    // resetPassword(password: string): Observable<any>
    // {
    //     return this._httpClient.post('api/auth/reset-password', password);
    // }
    //
    // /**
    //  * Sign in
    //  *
    //  * @param credentials
    //  */
    // signIn(credentials: { email: string; password: string }): Observable<any>
    // {
    //     // Throw error, if the user is already logged in
    //     if ( this._authenticated )
    //     {
    //         return throwError('User is already logged in.');
    //     }
    //
    //     return this._httpClient.post('api/auth/sign-in', credentials).pipe(
    //         switchMap((response: any) => {
    //
    //             // Store the access token in the local storage
    //             this.accessToken = response.token;
    //
    //             // Set the authenticated flag to true
    //             this._authenticated = true;
    //
    //             // Store the user on the user service
    //             // this._userService.user = response.user;
    //
    //             // Return a new observable with the response
    //             return of(response);
    //         })
    //     );
    // }
    //
    // /**
    //  * Sign in using the access token
    //  */
    // signInUsingToken(): Observable<any>
    // {
    //     // Renew token
    //     return this._httpClient.post('api/auth/refresh-access-token', {
    //         accessToken: this.accessToken
    //     }).pipe(
    //         catchError(() =>
    //
    //             // Return false
    //             of(false)
    //         ),
    //         switchMap((response: any) => {
    //
    //             // Store the access token in the local storage
    //             this.accessToken = response.accessToken;
    //
    //             // Set the authenticated flag to true
    //             this._authenticated = true;
    //
    //             // Store the user on the user service
    //             // this._userService.user = response.user;
    //
    //             // Return true
    //             return of(true);
    //         })
    //     );
    // }
    //
    // /**
    //  * Sign out
    //  */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        localStorage.clear();

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }
    //
    // /**
    //  * Sign up
    //  *
    //  * @param user
    //  */
    // // signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    // // {
    // //     return this._httpClient.post('api/auth/sign-up', user);
    // // }
    //
    // /**
    //  * Unlock session
    //  *
    //  * @param credentials
    //  */
    // unlockSession(credentials: { email: string; password: string }): Observable<any>
    // {
    //     return this._httpClient.post('api/auth/unlock-session', credentials);
    // }
    //
    // /**
    //  * Check the authentication status
    //  */
    // check(): Observable<boolean>
    // {
    //     // Check if the user is logged in
    //     if (this.loggedInStatus === true) {
    //         return of(true);
    //         console.log('auth', of(true));
    //     }
    //     if ( this._authenticated )
    //     {
    //         return of(true);
    //         console.log('auth2', of(true));
    //     }
    // }

    logIn(body: any): Observable<any> {
        return this._httpClient.post<any>(`${this._baseUrl}login`, body);
    }
    signup(body: any): Observable<any> {
        return this._httpClient.post<any>(`${this._baseUrl}signup`, body);
    }
    // getUserInfo(id): Observable<any> {
    //     return this._httpClient.post(`${environment.baseUrl}Users/GetUser/`, {id: id});
    // }

    setAuthInfoInLocalStorage(accessToken, payload): void {
        localStorage.clear();
        this.accessToken = accessToken;
        localStorage.setItem('auth', JSON.stringify({
            id: Number(payload.id),
            token:accessToken,
            loggedIn: true
        }));
    }

    get authInfo(): any {
        return JSON.parse(localStorage.getItem('auth'));
    }

    get loggedInStatus(): boolean {
        return this.authInfo && this.authInfo.loggedIn ? this.authInfo.loggedIn : false;
    }


  // openSnackBar(message): void {
  //   this._snackBar.open(message, 'X', {
  //     duration: 3000,
  //     panelClass: ['red-snackbar'],
  //     horizontalPosition: 'end',
  //     verticalPosition: 'top',
  //   });
  // }
}
