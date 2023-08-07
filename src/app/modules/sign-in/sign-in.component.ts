import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../core/auth/auth.service";
import {takeUntil} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  public signInValid = true;
  public userEmail = 'janedoe@doe.com';
  public password = 'notsosecurepassword';
  public isLoading: boolean;
  public form: FormGroup;
  private unsubscribeAll = new Subject();
  private readonly returnUrl: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _authService: AuthService
  ) {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/game';
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  public onSubmit(): void {
    this.signInValid = true;
    this.isLoading = true;

    const body = {
      "email": this.userEmail,
      "password": this.password,
    }

    this._authService.logIn(body)
      .pipe(takeUntil(this.unsubscribeAll)).subscribe((res) => {
      console.log(res);
      if(res){
        const payload = JSON.parse(atob(res.token.split('.')[1]));
        this.signInValid = true;
        this._authService.setAuthInfoInLocalStorage(res.token, payload);
        this.isLoading = false;
        this._snackBar.open('Sign in successfully done!!!','X', { duration: 3000 });
        this._router.navigateByUrl('/home').then(r => r);
      }
    }, error => {
      this._snackBar.open('Something went wrong',null, { duration: 3000 });
      this.signInValid = false;
      this.isLoading = false;
    });
  }

  goToSignUp() {
    this._router.navigateByUrl('/sign-up').then(r => r);
  }
}
