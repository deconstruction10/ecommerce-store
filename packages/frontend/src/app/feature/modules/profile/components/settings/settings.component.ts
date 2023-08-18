import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../../shared/services/auth.service";

@Component({
  selector: 'org-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements  OnInit {
  email: string | null = null;
  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUserEmail()
      .subscribe((userEmail: string | null) => {
        this.email = userEmail;
      })
  }
}
