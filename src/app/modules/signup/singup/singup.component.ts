import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit, OnDestroy {
  public signInValid = true;
  public username = '';
  public userEmail = '';
  public password = '';
  public isLoading: boolean;
  public form: FormGroup;
  private unsubscribeAll = new Subject();
  private readonly returnUrl: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private _authService: AuthService
  ) {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/home';
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
      "username": this.username,
      "email": this.userEmail,
      "password": this.password,
    }

    this._authService.signup(body)
      .pipe(takeUntil(this.unsubscribeAll)).subscribe((res) => {
        if(res){
          this._snackBar.open('Sign up successfully done!!!','X', { duration: 3000 });
          this.signInValid = true;
          this.isLoading = false;
          this.goToSignIn();
        }
    }, error => {
      this.signInValid = false;
      this.isLoading = false;
    });
  }

  goToSignIn() {
    this._router.navigateByUrl('/sign-in').then(r => r);
  }
}
