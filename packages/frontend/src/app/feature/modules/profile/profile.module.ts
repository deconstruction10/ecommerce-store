import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProfileRoutingModule } from './routing/profile.routing.module';
import { ProductsModule } from '../products/products.module';
import { ProfileGuard } from './guard/profile.guard';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { SettingsComponent } from './components/settings/settings.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { RecentlyViewedComponent } from './components/recently-viewed/recently-viewed.component';
import { SubscribesComponent } from './components/subscribes/subscribes.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { BonusComponent } from './components/bonus/bonus.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { MessageComponent } from './components/message/message.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  providers: [ProfileGuard],
  declarations: [
    ProfileComponent,
    SettingsComponent,
    PersonalInformationComponent,
    OrdersComponent,
    WishlistComponent,
    RecentlyViewedComponent,
    SubscribesComponent,
    WalletComponent,
    BonusComponent,
    ReviewsComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ProfileRoutingModule,
    ProductsModule,
    HomeModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatIconModule,
    MatExpansionModule
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
