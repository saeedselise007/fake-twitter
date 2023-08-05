import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SingupComponent } from './singup/singup.component';
import {FlexModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    SingupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    FlexModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class SignupModule { }
