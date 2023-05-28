import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { SignInComponent } from './components/sign-in/sign-in.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterLink, RouterModule} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {SharedRoutingModule} from "./routing/shared-routing.module";
import { AnimatedNavbarDirective } from './directives/animated-navbar.directive';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    NavbarComponent,
    SignInComponent,
    AnimatedNavbarDirective
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AngularFireAuthModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    NgOptimizedImage,
    RouterLink,
    MatDialogModule,
    RouterModule,
    MatSlideToggleModule,
    SharedRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ]
})
export class SharedModule { }
