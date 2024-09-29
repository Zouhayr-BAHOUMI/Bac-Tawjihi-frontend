import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../shared/compenants/dashboard/navbar/navbar.component";
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../../../shared/compenants/dashboard/sidebar/sidebar.component";
import { FooterComponent } from "../../../shared/compenants/dashboard/footer/footer.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule, SidebarComponent, FooterComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

}
