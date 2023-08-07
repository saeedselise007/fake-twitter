import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from "./auth.service";
import {AuthInterceptor} from "./auth.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
@NgModule({
  imports: [
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  entryComponents:[]
})
export class AuthModule {
}
