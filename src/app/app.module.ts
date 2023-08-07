import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlexLayoutModule} from "@angular/flex-layout";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./core/auth/auth.service";
import {AuthGuard} from "./core/auth/guards/auth.guard";
import {AuthInterceptor} from "./core/auth/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full',
        },
        {
          path: 'sign-up',
          // canActivate: [RouterGuard],
          // component: SingupComponent,
          loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule)
        },
        {
          path: 'sign-in',
          // canActivate: [RouterGuard],
          loadChildren: () => import('./modules/sign-in/sign-in.module').then(m => m.SignInModule)
        },
        {
          path: 'home',
          canActivate: [AuthGuard],
          loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
        },
      ],
    )
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
