import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import {BehaviorSubject, catchError, from, map, Observable, of, switchMap, tap, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private afAuth: AngularFireAuth,
    private readonly snackBar: MatSnackBar
  ) {
    this.afAuth.authState
      .pipe(
        map((user) => !!user),
        tap((isLoggedIn) => this.loggedIn$.next(isLoggedIn))
      )
      .subscribe();
  }

  register(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  private showLoginSuccessSnackBar(): void {
    this.snackBar.open('Login successful', 'Close', {
      duration: 3000,
    });
  }
  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
  resetPassword(email: string): Promise<void> {
    return this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.snackBar.open(
          'Password reset email sent. Please check your inbox.',
          'OK',
          { duration: 5000 }
        );
      })
      .catch(() => {
        this.snackBar.open(
          'Failed to send password reset email. Please try again later.',
          'OK',
          { duration: 5000 }
        );
      });
  }
  getUserEmail(): Observable<string | null> {
    return this.afAuth.authState
      .pipe(
        map((user: firebase.User | null) => (user ? user.email: null)),
      )
  }
  async updateUserEmail(newEmail: string): Promise<void> {
    try {
      const user: firebase.User | null = await this.afAuth.currentUser;
      if (user) {
        await user.updateEmail(newEmail);
        this.snackBar.open('Email has been updated successfully!', 'Close', {
          duration: 2000,
        });
      } else {
        throw new Error('No authenticated user found');
      }
    } catch (error) {
      this.snackBar.open('Error updating email. Please try again.', 'Close', {
        duration: 2000,
      });
      throw error;
    }
  }
  async updateUserPassword(newPassword: string): Promise<void> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.updatePassword(newPassword);
        this.snackBar.open('Password has been updated successfully!', 'Close', {
          duration: 3000,
        });
      } else {
        throw new Error('No authenticated user found');
      }
    } catch (error) {
      this.snackBar.open('Error updating password. Please try again.', 'Close', {
        duration: 3000,
      });
      throw error;
    }
  }
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }
}
