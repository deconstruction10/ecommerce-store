import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "../components/profile/profile.component";
import {ProfileGuard} from "../guard/profile.guard";

const routes: Routes = [
  {path: '', component: ProfileComponent, canActivate: [ProfileGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
