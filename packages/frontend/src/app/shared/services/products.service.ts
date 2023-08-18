import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse, Brand, Products, Series} from "../interfaces/products";
import {catchError, map, Observable, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsApi: string = '/api/series';
  constructor(private readonly http: HttpClient, private readonly matSnackBar: MatSnackBar) {
  }
  getSeries(take: number, page: number, brandName: string): Observable<Series[]> {
    return this.http.get<ApiResponse>(`${this.productsApi}/filtered/?take=${take}&page=${page}&brandName=${brandName}`)
      .pipe(
      map((response: ApiResponse) => response.data),
      catchError((error) => {
        const errorMessage = 'Failed to get series.';
        this.matSnackBar.open(errorMessage, 'Close', {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-warn'],
        });
        return throwError(errorMessage + ' ' + error);
      })
    );
  }

  searchSeries(take: number, page: number, searchQuery: string): Observable<{ brands: Series[]; series: Series[] }> {
    return this.http
      .get<ApiResponse>(`${this.productsApi}/filtered/?take=${take}&page=${page}&searchQuery=${searchQuery}`)
      .pipe(
        map(((response: ApiResponse) => {
          const filteredSeries: Series[] = response.data.filter((series: Series) => {
            return series.seriesName.includes(searchQuery)
          });

          const filteredBrands: Series[] = response.data.filter((brands: Series) => {
            return brands.brandName.includes(searchQuery);
          });

          return {
            series: filteredSeries,
            brands: filteredBrands,
          };
        }),
        catchError((error) => {
          const errorMessage = 'Failed to get data.';
          this.matSnackBar.open(errorMessage, 'Close', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-warn'],
          });
          return throwError(errorMessage + ' ' + error);
        })
      ));
  }
}
