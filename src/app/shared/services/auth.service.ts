import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {BehaviorSubject, Observable} from "rxjs";
import { User } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import auth = firebase.auth;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {
  }
  signIn(email: string, password: string):  Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  signInWithYahoo(): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithPopup(new auth.OAuthProvider('yahoo.com'));
  }

  signInWithMicrosoft(): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithPopup(new auth.OAuthProvider('microsoft.com'));
  }
}
