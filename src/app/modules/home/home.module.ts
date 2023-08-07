import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { TimeLineComponent } from './time-line/time-line.component';
import { TweetComponent } from './tweet/tweet.component';
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {HomeService} from "../services/home.service";
import {AuthService} from "../../core/auth/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {TweetFeedModule} from "../../shared/modules/tweet-feed/tweet-feed.module";


@NgModule({
  declarations: [
    HomeComponent,
    TimeLineComponent,
    TweetComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    TweetFeedModule
  ],
  providers:[HomeService, AuthService]
})
export class HomeModule { }
