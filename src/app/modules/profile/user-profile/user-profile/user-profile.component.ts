import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../../services/home.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public AllTweets = [];
  public AllFollowerList;
  public AllFollowingList;
  public userId;
  public paramsObject;
  constructor(
    public services: HomeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap
      .subscribe((params) => {
            this.userId = params.get('id');
        }
      );
  }

  ngOnInit(): void {
    this.getUserTweets();
    this.getUserFollower();
    this.getUserFollowing();
  }

  getUserTweets(): void {
    this.services.getUserDetails(this.userId).subscribe( (res) => {
      this.AllTweets = res.tweets;
    })
  }
  getUserFollower(): void {
    this.services.getUserFollowerList(this.userId).subscribe( (res) => {
      this.AllFollowerList = res;
    })
  }
  getUserFollowing(): void {
    this.services.getUserFollowingList(this.userId).subscribe( (res) => {
      this.AllFollowingList = res;
    })
  }

}
