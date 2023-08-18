import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {FirebaseEmailErrorCodes} from "../../interfaces/firebase-error";

@Component({
  selector: 'org-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public hide?: boolean;
  email = new FormControl();
  password = new FormControl();
  public loginForm!: FormGroup;
  // protected readonly faMicrosoft = faMicrosoft;
  // protected readonly faGoogle = faGoogle;
  // protected readonly faFacebook = faFacebook;
  constructor(private readonly auth: AuthService,
              private readonly fb: FormBuilder,
              private readonly dialog: MatDialog,
              private readonly router: Router,
              private  readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });


  };

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.auth.login(email, password)
        .then(() => {
          this.snackBar.open("You're now logged in!", 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.dialog.closeAll();
          this.router.navigate(['/profile']);
        })
        .catch((error) => {
          switch (error.code) {
            case FirebaseEmailErrorCodes.InvalidEmail:
              this.snackBar.open('Invalid email.', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
              break;
            case FirebaseEmailErrorCodes.UserDisabled:
              this.snackBar.open('User is disabled.', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
              break;
            default:
              this.snackBar.open('Login failed.', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
              break;
          }
        });
    } else {
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }
  openSignUpDialog(): void {
    this.dialog.closeAll();
    const dialogRef= this.dialog.open(SignUpComponent, {
      width: '600px',
      height: '600px'
    });
    dialogRef.afterClosed().subscribe(result => result);
  };

  openResetPasswordDialog(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '500px',
      height: '500px'
    });
    dialogRef.afterClosed().subscribe(result => result);
  };
}

