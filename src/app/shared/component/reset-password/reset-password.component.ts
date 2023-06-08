import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ɵElement} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SignInComponent} from "../sign-in/sign-in.component";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  email = new FormControl();
  constructor(private readonly fb: FormBuilder,
              private readonly auth: AuthService,
              private readonly dialog: MatDialog,
              private readonly snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  };

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.value.email;
      this.auth.resetPassword(email)
        .then(() => {
          this.resetPasswordForm.reset();
          this.openSnackBar('Password reset email sent', 'Close');
        })
        .catch((error) => {
          console.log('Failed to reset password:', error);
          this.openSnackBar('Failed to reset password', 'Close');
        });
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000, // Задайте бажану тривалість відображення
      verticalPosition: 'top', // Виберіть позицію відображення (top, bottom)
    });
  }
  openResetPasswordDialog() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(SignInComponent, {
      width: '600px',
      height: '600px'
    });
    dialogRef.afterClosed().subscribe(result => result);
  };

}
