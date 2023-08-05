import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

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
    private formBuilder: FormBuilder,
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
      "username": this.username,
      "email": this.userEmail,
      "password": this.password,
    }

    this._authService.signup(body)
      .pipe(takeUntil(this.unsubscribeAll)).subscribe((res) => {
        if(res){
          this.signInValid = true;
          this.isLoading = false;
        }
    }, error => {
      this.signInValid = false;
      this.isLoading = false;
    });
  }
}
