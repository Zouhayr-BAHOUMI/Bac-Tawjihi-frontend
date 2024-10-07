import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../../shared/compenants/dashboard/sidebar/sidebar.component";
import { NavbarComponent } from "../../../shared/compenants/dashboard/navbar/navbar.component";
import { FooterComponent } from "../../../shared/compenants/dashboard/footer/footer.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {

}
