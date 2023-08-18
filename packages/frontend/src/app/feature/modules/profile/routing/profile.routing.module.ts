import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileGuard } from "../guard/profile.guard";
import { ProfileComponent } from "../components/profile/profile.component";
import { SettingsComponent } from "../components/settings/settings.component";
import { ProductsComponent } from "../../products/components/products/products.component";
import { PersonalInformationComponent } from "../components/personal-information/personal-information.component";
import { OrdersComponent } from "../components/orders/orders.component";
import { WishlistComponent } from "../components/wishlist/wishlist.component";
import { RecentlyViewedComponent } from "../components/recently-viewed/recently-viewed.component";
import { SubscribesComponent } from "../components/subscribes/subscribes.component";
import { WalletComponent } from "../components/wallet/wallet.component";
import { BonusComponent } from "../components/bonus/bonus.component";
import { ReviewsComponent } from "../components/reviews/reviews.component";
import { MessageComponent } from "../components/message/message.component";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent, children: [
          { path: '', redirectTo: 'personal-information', pathMatch: 'full' },
          { path: 'personal-information', component: PersonalInformationComponent },
          { path: 'orders', component: OrdersComponent },
          { path: 'wishlist', component: WishlistComponent },
          { path: 'recently-viewed', component: RecentlyViewedComponent },
          { path: 'subscribes', component: SubscribesComponent },
          { path: 'wallet', component: WalletComponent },
          { path: 'bonus', component: BonusComponent },
          { path: 'reviews', component: ReviewsComponent },
          { path: 'message', component: MessageComponent },
        ]},
      { path: 'products', component: ProductsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
