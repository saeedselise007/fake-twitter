import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-tweet-feed',
  templateUrl: './tweet-feed.component.html',
  styleUrls: ['./tweet-feed.component.css']
})
export class TweetFeedComponent implements OnInit {
  @Input() userDetails;
  constructor(  private _router: Router,
                private authService: AuthService) { }

  ngOnInit(): void {
  }
  onClick(id) {
    if(this.authService.authInfo.id === id){
      return;
    }
    this._router.navigateByUrl(`/home/user/${id}`).then(r => r);
  }
}
