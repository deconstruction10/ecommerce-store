import {Directive, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Directive({
  selector: '[orgErrorHandling]',
})
export class ErrorHandlingDirective implements OnInit, OnDestroy {
  constructor(private readonly snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
}
