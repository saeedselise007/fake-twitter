import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { ExploreComponent } from './explore/explore.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HomeService} from "../services/home.service";
import {LoaderModule} from "../../shared/modules/loader/loader.module";
import {AuthService} from "../../core/auth/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

const routes: Routes = [
  {
    path: '',
    component: ExploreComponent
  }
]


@NgModule({
  declarations: [
    ExploreComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    LoaderModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [HomeService, AuthService]
})
export class ExploreModule { }
