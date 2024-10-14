import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { Etudiant } from 'src/app/interfaces/etudiant';
import { EtudiantService } from 'src/app/shared/services/etudiant.service';
import { MainFooterComponent } from "../main-footer/main-footer.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MainFooterComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  userName: string | null = null;
  etudiant: Etudiant | null = null;
  isMenuOpen: boolean = false;

  constructor(
    private authService: AuthService, 
    private etudiantService : EtudiantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.etudiantService.getEtudiantProfile().subscribe(
        (response: Etudiant) => {
          this.etudiant = response;
        },
        error => {
          console.error('Error fetching student profile:', error);
        }
      );
    }
  }
  
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
    
}
