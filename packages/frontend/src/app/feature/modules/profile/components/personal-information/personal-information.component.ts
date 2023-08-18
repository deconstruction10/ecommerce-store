import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../../../shared/services/auth.service";
import {combineLatest} from "rxjs";

@Component({
  selector: 'org-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
  isEditing: boolean = false;
  email: string | null = null;
  password: string | null = null;
  language: string[] = ['Ukrainian', 'English'];
  selectedLanguage: string | null = null;
  birthdate: Date | null = null;
  gender: string[] = ['Male', 'Female'];
  selectedGender: string | null = null;
  emailControl = new FormControl('',
    [Validators.required, Validators.email]);
  passwordControl = new FormControl('',
    [ Validators.required, Validators.minLength(6)]);
  birthdateControl = new FormControl(1, [Validators.required]);
  genderControl = new FormControl('', [Validators.required]);
  languageControl = new FormControl('', [Validators.required]);
  private newEmail: string | null = null;
  private newPassword: string | null = null;
  private isEmailChanged: boolean = false;
  private isPasswordChanged: boolean = false;
  private isLanguageChanged: boolean = false;
  private isBirthdateChanged: boolean = false;
  private isGenderChanged: boolean = false;
  constructor(private readonly authService: AuthService, private readonly snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.authService.getUserEmail()
      .subscribe(email => {
        this.email = email;
      })
    combineLatest([
      this.emailControl.valueChanges,
      this.passwordControl.valueChanges,
      this.languageControl.valueChanges,
      this.birthdateControl.valueChanges,
      this.genderControl.valueChanges
    ])
      .subscribe(([email, password, language, birthdate, gender]) => {
        this.isEmailChanged = email !== this.email;
        this.isPasswordChanged = password !== this.password;
        this.isLanguageChanged = language !== this.selectedLanguage;
        this.isBirthdateChanged = birthdate !== this.birthdate;
        this.isGenderChanged = gender !== this.selectedGender;
      });

    this.emailControl.valueChanges.subscribe(value => {
      this.newEmail = value;
    });
    this.passwordControl.valueChanges.subscribe(value => {
      this.newPassword = value;
    });
    this.birthdateControl.valueChanges.subscribe(value => {
      this.isBirthdateChanged = value !== this.birthdate;
    });
    this.genderControl.valueChanges.subscribe(value => {
      this.isGenderChanged = value !== this.selectedGender;
    });
    this.languageControl.valueChanges.subscribe(value => {
      this.isLanguageChanged = value !== this.selectedLanguage;
    });

    this.password = '';
    this.email = '';
    this.selectedLanguage = 'Ukrainian';
    this.birthdate = new Date('1990-01-01');
    this.selectedGender = 'Male';
  }
  startEditing(): void {
    this.isEditing = true;
  }
  async saveChanges(): Promise<void> {
    if (!this.isEditing) {
      return;
    }

    if (this.email === null || this.password === null) {
      this.snackBar.open('Email or password is missing.', 'Close', {
        duration: 3000,
      });
      return;
    }

    try {
      await this.authService.updateUserEmail(this.email);
      await this.authService.updateUserPassword(this.password);

      this.isEditing = false;

      let snackBarMessage = 'Changes saved.';

      if (this.isEmailChanged || this.isPasswordChanged) {
        snackBarMessage += ' Please log in again with the new credentials.';
      }

      if (this.isLanguageChanged || this.isBirthdateChanged || this.isGenderChanged) {
        snackBarMessage += ' Other changes may affect your account.';
      }
      this.snackBar.open(snackBarMessage, 'Close', {
        duration: 5000,
      });
    } catch (error) {
      this.snackBar.open('An error occurred while saving changes. Please try again.', 'Close', {
        duration: 3000,
      });
    }
  }
  cancelEditing(): void {
    this.isEditing = false;
  }
  onBirthdateChange(newDate: string): void {
    this.birthdate = new Date(newDate);
  }
  formatBirthdate(): string {
    return this.birthdate ? this.birthdate.toLocaleDateString() : 'Not provided';
  }
}
