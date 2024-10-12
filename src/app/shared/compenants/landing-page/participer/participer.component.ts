import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { MainFooterComponent } from "../main-footer/main-footer.component";

@Component({
  selector: 'app-participer',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MainFooterComponent],
  templateUrl: './participer.component.html',
  styleUrls: ['./participer.component.scss']
})
export class ParticiperComponent {

}
