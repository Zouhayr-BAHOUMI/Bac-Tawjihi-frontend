import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { EcolesSectionComponent } from "./shared/compenants/landing-page/ecoles-section/ecoles-section.component";
import { WarraperComponent } from "./shared/compenants/landing-page/warraper/warraper.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, EcolesSectionComponent, WarraperComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tawjihi-frontend';
}
