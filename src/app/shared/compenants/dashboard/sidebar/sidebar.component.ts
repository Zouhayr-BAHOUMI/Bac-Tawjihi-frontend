import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { SideBarService } from 'src/app/shared/services/side-bar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  isSidebarVisible: boolean = true;
  screenWidth: number = window.innerWidth;

  constructor(private authService: AuthService, private sidebarService: SideBarService) {}

  ngOnInit(): void {
    this.sidebarService.isSidebarVisible().subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
    this.checkScreenSize();
  }

  isEtudiant(): boolean {
    return this.authService.getCurrentUserRole() === 'ETUDIANT';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (this.screenWidth < 1000) {
      this.isSidebarVisible = false;
    } else {
      this.isSidebarVisible = true;
    }
  }

}
