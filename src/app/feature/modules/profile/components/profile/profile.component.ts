import { Component } from '@angular/core';
import {AuthService} from "../../../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SignInComponent} from "../../../../../shared/components/sign-in/sign-in.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private readonly auth: AuthService,
              private readonly router: Router,
              private readonly dialog: MatDialog) {
  }

  logout() {
    this.auth.logout()
      .then(() => this.dialog.open(SignInComponent, {
        width: '600px',
        height: '600px'
      }))
      .then(() => this.router.navigate(['/sign-in']));
  };
}
