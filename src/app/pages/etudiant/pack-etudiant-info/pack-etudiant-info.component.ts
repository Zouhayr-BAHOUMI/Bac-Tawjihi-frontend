import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PackService } from 'src/app/shared/services/pack.service';
import { Pack } from 'src/app/interfaces/pack';
import { Etudiant } from 'src/app/interfaces/etudiant';
import { ReactiveFormsModule } from '@angular/forms';
import { EtudiantService } from 'src/app/shared/services/etudiant.service';
import { StripeService } from 'src/app/shared/services/stripe.service';

@Component({
  selector: 'app-pack-etudiant-info',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './pack-etudiant-info.component.html',
  styleUrls: ['./pack-etudiant-info.component.scss']
})
export class PackEtudiantInfoComponent implements OnInit {

  etudiant!: Etudiant;
  pack!: Pack;

  constructor(
    private route: ActivatedRoute,
    private etudiantService: EtudiantService,
    private stripeService: StripeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idPack = this.route.snapshot.params['idPack'];
    this.selectPack(idPack);
  }

  selectPack(idPack: number): void {
    this.etudiantService.selectPack(idPack).subscribe(
      (response: any) => {
        this.etudiant = response.etudiant;
        this.pack = response.pack;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  pay(): void {
    
  }

  cancel(): void {
    this.router.navigate(['']); 
  }

}
