import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TimeLineComponent} from "./time-line/time-line.component";
import {AuthGuard} from "../../core/auth/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: TimeLineComponent
      },
      {
        path: 'user/:id',
        canActivate: [AuthGuard],
        loadChildren: () => import('../profile/user-profile/user-profile.module').then(m => m.UserProfileModule)
      },
      {
        path: 'explore',
        canActivate: [AuthGuard],
        loadChildren: () => import('../explore/explore.module').then(m => m.ExploreModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
