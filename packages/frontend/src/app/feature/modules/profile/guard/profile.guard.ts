import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {delay, switchMap} from 'rxjs/operators';
import { AuthService } from '../../../../shared/services/auth.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.isLoggedIn()
      .pipe(
      switchMap((isLoggedIn: boolean): Observable<boolean> => {
        if (isLoggedIn) {
          return of(true);
        } else {
          return this.showSnackBarAndRedirect();
        }
      }),
      switchMap((result: boolean) => of(result).pipe(delay(0)))
    );
  }

  private showSnackBarAndRedirect(): Observable<boolean> {
    this.snackBar.open('Please log in to access your profile', 'Close', {
      duration: 3000,
    });

    this.router.navigateByUrl('/home');
    return of(false);
  }
}
