import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../services/home.service";
import {AuthService} from "../../../core/auth/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean;
  public AllTimeLineFeeds = [];

  constructor(
    public services: HomeService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      message: [''],
    });
    this.getAllTweets();
  }

  public getAllTweets(): void {
    this.isLoading = true;
    this.services.getMyTimeline().subscribe((res) => {
      this.AllTimeLineFeeds = [...res.timeline];
      this.isLoading = false;
    });
  }

  tweet() {
    const message = this.form.get('message').value;
    if (message.length === 0) {
      return;
    }
    this.isLoading = true;
    // const userId = this._authService.authInfo.id;
    const body =
      {
        "content": message,
      }
    this.services.postTweet(body).subscribe((res) => {
      if (res) {
        this.isLoading = false;
        this.form.reset();
        this.openSnackBar(res.message)
        this.getAllTweets();
      }

    }, error => {
      this.isLoading = false;
      console.log(error);
    })
  }

  openSnackBar(message): void {
    this._snackBar.open(message, 'X', {
      duration: 3000,
    });
  }
}
