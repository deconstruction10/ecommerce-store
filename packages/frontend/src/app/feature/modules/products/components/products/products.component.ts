import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProductsService} from "../../../../../shared/services/products.service";
import {Series} from "../../../../../shared/interfaces/products";
import {BehaviorSubject} from "rxjs";
import {SharedDataService} from "../../../../../shared/services/shared-data.service";
import {NgIfContext} from "@angular/common";

@Component({
  selector: 'org-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  seriesData: Series[] = [];
  selectedBrand$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  page: number = 1;
  take: number = 30;
  searchQuery: string = '';
  noResults: boolean = false;
  noResultsTemplate!: TemplateRef<NgIfContext<boolean>> | null;

  constructor(
    private readonly productsService: ProductsService,
    private readonly sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.sharedDataService.getSelectedBrand()
      .subscribe(((brandName: string | null) => {
      this.selectedBrand$.next(brandName);
    }));

    this.sharedDataService.searchQuery.subscribe(((searchQuery: string) => {
      this.searchQuery = searchQuery;
      this.getFilteredSeries();
    }));

    this.selectedBrand$.subscribe(((brandName: string | null) => {
      if (brandName) {
        this.productsService
          .getSeries(this.take, this.page, brandName)
          .subscribe((series: Series[]) => {
          this.noResultsTemplate = series.length === 0 ? this.noResultsTemplate : null;
          this.seriesData = series;
        });
      } else {
        this.seriesData = [];
        this.noResultsTemplate = null;
      }
    }));
  }

  selectBrand(brand: string): void {
    this.sharedDataService.setSelectedBrand(brand);
  }

  changePage(page: number): void {
    this.page = page;
    this.getFilteredSeries();
  }

  changeTake(take: number): void {
    this.take = take;
    this.getFilteredSeries();
  }

  private getFilteredSeries(): void {
    this.selectedBrand$.next(this.selectedBrand$.getValue());
  }
}
