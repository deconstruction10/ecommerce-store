import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SignInComponent} from "../sign-in/sign-in.component";
import {BehaviorSubject, delay, map, Observable, of, Subscription, take, timer} from "rxjs";
import {SignUpComponent} from "../sign-up/sign-up.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private readonly dialog: MatDialog) {
  }

  ngOnInit() {
  };

  openSignInDialog() {
    this.dialog.open(SignInComponent, {width: '600px', height: '600px'});
  };

  openSignUpDialog() {
    this.dialog.open(SignUpComponent, {width: '600px', height: '600px'});
  };
}
