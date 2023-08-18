import {Component, OnInit, Sanitizer} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FirebaseEmailErrorCodes} from "../../interfaces/firebase-error";
import {SignInComponent} from "../sign-in/sign-in.component";

@Component({
  selector: 'org-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;
  email = new FormControl();
  password = new FormControl();
  hide: boolean = false;
  constructor(private readonly fb: FormBuilder,
              private readonly dialog: MatDialog,
              private readonly auth: AuthService,
              private readonly snackBar: MatSnackBar,
              private readonly sanitizer: Sanitizer) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  };

  register() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.auth.register(email, password)
        .then(() => {
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });

          this.dialog.closeAll();
          this.dialog.open(SignInComponent, {
            width: '600px',
            height: '600px',
            disableClose: true,
            autoFocus: false
          });
        })
        .catch((error) => {
          switch (error.code) {
            case FirebaseEmailErrorCodes.EmailAlreadyInUse:
              this.snackBar.open('Email is already in use.', 'Close', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
              break;
            case FirebaseEmailErrorCodes.InvalidEmail:
              this.snackBar.open('Invalid email.', 'Close', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
              break;
            default:
              this.snackBar.open('Registration failed.', 'Close', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
              break;
          }
        });
    } else {
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  openSignInDialog(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(SignInComponent, {
      width: '600px',
      height: '600px'
    });
    dialogRef.afterClosed().subscribe(result => result);
  };
}
