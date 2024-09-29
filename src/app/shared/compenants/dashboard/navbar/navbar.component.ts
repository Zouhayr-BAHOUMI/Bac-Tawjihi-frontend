import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  fullName : string = '';
  isDropdownVisible : boolean = false;


 constructor(private authService: AuthService) {}

 ngOnInit(): void {
   this.setUserFullName();
 }
 setUserFullName() {
   const userName = this.authService.getCurrentUserName();
   this.fullName = userName || 'User';
 }
 

 toggleDropdown() {
   this.isDropdownVisible = !this.isDropdownVisible;
 }

 logout() {
   this.authService.logout();
 }
}
