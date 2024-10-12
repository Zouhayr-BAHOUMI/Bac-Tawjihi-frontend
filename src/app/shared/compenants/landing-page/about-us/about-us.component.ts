import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MainFooterComponent } from "../main-footer/main-footer.component";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MainFooterComponent],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

}
