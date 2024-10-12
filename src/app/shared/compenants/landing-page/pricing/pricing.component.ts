import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pack } from 'src/app/interfaces/pack';
import { PackService } from 'src/app/shared/services/pack.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EtudiantService } from 'src/app/shared/services/etudiant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit{


  packs: Pack[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private packService: PackService,
    private authService : AuthService,
    private route: ActivatedRoute,
    private etudiantService: EtudiantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getPacks();
  }

  public getPacks(): void {
    this.packService.getPacksWithFilieres().subscribe(
      (response: Pack[]) => {
        console.log(response);
        this.packs = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  selectPack(idPack: number): void {
    this.etudiantService.selectPack(idPack).subscribe(
      (response: any) => {
        this.router.navigate(['/student-details', idPack]);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

}
