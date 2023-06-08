import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import {Observable} from "rxjs";
import * as auth from 'firebase/auth';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private readonly snackBar: MatSnackBar) {
  }
  register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  };
  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  };
  logout(): Promise<void> {
    return this.afAuth.signOut();
  };

  resetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.snackBar.open('Password reset email sent. Please check your inbox.', 'OK', { duration: 5000 });
      })
      .catch(() => {
        this.snackBar.open('Failed to send password reset email. Please try again later.', 'OK', { duration: 5000 });
      });
  }

  loggedIn(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      const unsubscribe = this.afAuth.onAuthStateChanged(
        user => {
        const isLoggedIn = !!user;
        subscriber.next(isLoggedIn);
      });

      return async () => (await unsubscribe)();
    });
  };
}
