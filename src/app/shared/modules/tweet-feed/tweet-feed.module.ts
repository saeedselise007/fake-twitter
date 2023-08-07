import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetFeedComponent } from './tweet-feed.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../../core/auth/auth.service";



@NgModule({
  declarations: [
    TweetFeedComponent
  ],
  exports: [
    TweetFeedComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  providers:[AuthService]
})
export class TweetFeedModule { }
