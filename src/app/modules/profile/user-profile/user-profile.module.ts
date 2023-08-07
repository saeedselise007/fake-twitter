import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatCardModule} from "@angular/material/card";
import {HomeService} from "../../services/home.service";
import {TweetFeedModule} from "../../../shared/modules/tweet-feed/tweet-feed.module";
import {MatButtonToggleModule} from "@angular/material/button-toggle";


@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MatCardModule,
    TweetFeedModule,
    MatButtonToggleModule
  ],
  providers:[HomeService]
})
export class UserProfileModule { }
