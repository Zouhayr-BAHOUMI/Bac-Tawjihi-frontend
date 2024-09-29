import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { HeroSectionComponent } from "../hero-section/hero-section.component";
import { ServicesSectionComponent } from "../services-section/services-section.component";
import { TestSectionComponent } from "../test-section/test-section.component";
import { EcolesSectionComponent } from "../ecoles-section/ecoles-section.component";
import { PricingComponent } from "../pricing/pricing.component";

@Component({
  selector: 'app-warraper',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HeroSectionComponent, ServicesSectionComponent, TestSectionComponent, EcolesSectionComponent, PricingComponent],
  templateUrl: './warraper.component.html',
  styleUrls: ['./warraper.component.scss']
})
export class WarraperComponent {

}
