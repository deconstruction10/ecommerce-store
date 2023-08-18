import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "../components/products/products.component";
import {ProfileGuard} from "../../profile/guard/profile.guard";


const routes: Routes = [
  {path: '', component: ProductsComponent, canActivate: [ProfileGuard]}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
