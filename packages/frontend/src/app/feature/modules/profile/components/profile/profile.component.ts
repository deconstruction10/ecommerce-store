import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SignInComponent} from "../../../../../shared/components/sign-in/sign-in.component";
import {Products, Series} from "../../../../../shared/interfaces/products";
import {SharedDataService} from "../../../../../shared/services/shared-data.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {debounceTime, distinctUntilChanged, switchMap, tap, timer} from "rxjs";
import {ProductsService} from "../../../../../shared/services/products.service";
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'org-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('bounceAnimation', [
      state('bounceIn', style({ transform: 'scale3d(1, 1, 1)' })),
      state('bounceOut', style({ transform: 'scale3d(0.3, 0.3, 0.3)' })),
      transition('bounceIn <=> bounceOut', animate('0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'))
    ])
  ]
})
export class ProfileComponent implements OnInit {
  products: Products | undefined;
  iconState = 'bounceIn';
  selectedBrand: string | undefined;
  searchQuery: string = '';
  page: number = 1;
  take: number = 10;
  searchControl = new FormControl;
  filteredSeries: Series[] = [];
  constructor(private readonly sharedDataService: SharedDataService,
              private readonly productsService: ProductsService,
              private readonly auth: AuthService,
              private readonly router: Router,
              private readonly dialog: MatDialog
  ) {
  }
  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          return value ? this.productsService.searchSeries(10, 1, value) : [];
        })
      ).subscribe(
        (response: {brands: Series[], series: Series[]}) => {
          this.filteredSeries = response.series;
        },
        error => {
          console.log('Error while fetching search results:', error)
        }
    )
  }
  clearSearch() {
    this.searchQuery = '';
    this.performSearch();
  }
  performSearch() {
    this.sharedDataService.setSearchQuery(this.searchQuery);
  }

  private performSeriesSearch() {
    this.productsService.searchSeries(this.take, this.page, this.searchQuery)

  }
  selectBrand(brand: string): void {
    this.sharedDataService.setSelectedBrand(brand);
  }
  toggleIconState() {
    this.iconState = this.iconState === 'bounceIn' ? 'bounceOut' : 'bounceIn';

    timer(300)
      .pipe(
      tap(() => {
        this.iconState = this.iconState === 'bounceOut' ? 'bounceIn' : this.iconState;
      })
    ).subscribe();
  }
  logout() {
    this.auth.logout()
      .then(() => this.dialog.open(SignInComponent, {
        width: '600px',
        height: '600px'
      }))
      .then(() => this.router.navigate(['/home']))
  };

  onOptionSelected($event: MatAutocompleteSelectedEvent) {

  }
}
