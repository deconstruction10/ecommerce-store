import { Route } from '@angular/router';
import {HomeComponent} from "./feature/modules/home/components/home/home.component";

export const appRoutes: Route[] = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'products', loadChildren: () =>
      import('./feature/modules/products/products.module').then(m => m.ProductsModule)},
  {path: 'profile', loadChildren: () =>
      import('./feature/modules/profile/profile.module').then(m => m.ProfileModule)},
];
