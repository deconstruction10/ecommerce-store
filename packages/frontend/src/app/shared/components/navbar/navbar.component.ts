import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SignInComponent} from "../sign-in/sign-in.component";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'org-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  isLoggedIn: boolean = false;
  constructor(private readonly dialog: MatDialog,
              private readonly authService: AuthService,
              private readonly snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.authService.isLoggedIn()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoggedIn: boolean) => {
        console.log(isLoggedIn);
        this.isLoggedIn = isLoggedIn;
        if (!isLoggedIn) {
          this.openSnackBar();
        }
      });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  openSnackBar() {
    this.snackBar.open('Please log in to access your profile', 'Close', {
      duration: 3000,
    });
  }
  openSignInDialog() {
    this.dialog.open(SignInComponent, {width: '600px', height: '600px'});
  };

  openSignUpDialog() {
    this.dialog.open(SignUpComponent, {width: '600px', height: '600px'});
  };
}
