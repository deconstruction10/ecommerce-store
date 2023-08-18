import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private readonly searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchQuery:Observable<string> = this.searchQuerySubject.asObservable();
  private selectedBrandSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);
  constructor() { }

  setSelectedBrand(brand: string): void {
    this.selectedBrandSubject.next(brand);
  }
  getSelectedBrand(): BehaviorSubject<string | null> {
    return this.selectedBrandSubject;
  }

  setSearchQuery(searchQuery: string): void {
    this.searchQuerySubject.next(searchQuery);
  }
}
