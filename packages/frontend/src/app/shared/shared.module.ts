import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ErrorHandlingDirective } from './directives/error-handling.directive';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedRoutingModule} from "./routing/shared-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {FirestoreModule} from "@angular/fire/firestore";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {ProductsService} from "./services/products.service";

@NgModule({
  declarations: [
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    ErrorHandlingDirective,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatMenuModule,
    MatSlideToggleModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgOptimizedImage,
    MatInputModule,
    FontAwesomeModule,
    SharedRoutingModule,
    HttpClientModule,
    AngularFireAuthModule,
    FirestoreModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  exports: [
    NavbarComponent,
  ]
})
export class SharedModule {}
