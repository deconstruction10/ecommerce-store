import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {catchError, Observable, Subject, Subscription, takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FirebaseEmailErrorCodes} from "../interfaces/FirebaseEmailError";

@Directive({
  selector: '[appErrorHandling]'
})
export class ErrorHandlingDirective implements OnInit, OnDestroy {
  constructor(private readonly snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
}
