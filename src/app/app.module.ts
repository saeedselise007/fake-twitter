import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SingupComponent} from "./modules/signup/singup/singup.component";
import {FlexLayoutModule} from "@angular/flex-layout";
// import {RouterGuard} from "./core/auth/guards/routerGuard/router.guard";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: 'sign-in',
          // canActivate: [RouterGuard],
          // component: SingupComponent,
          loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule)
        },
      ],
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
