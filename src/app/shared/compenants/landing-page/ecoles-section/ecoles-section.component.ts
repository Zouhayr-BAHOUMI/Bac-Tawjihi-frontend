import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Etablissement } from 'src/app/interfaces/etablissement';
import { EtablissementService } from 'src/app/shared/services/etablissement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ecoles-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ecoles-section.component.html',
  styleUrls: ['./ecoles-section.component.scss']
})
export class EcolesSectionComponent implements OnInit {

  etablissements: Etablissement[] = [];

  constructor(
    private etablissementService: EtablissementService
  ) { }

  ngOnInit() {
    this.getEtablissements();
  }

  public getEtablissements(): void {
    this.etablissementService.getHomeEtablissements().subscribe(
      (response: Etablissement[]) => {
        this.etablissements = response;
        this.etablissements = response.slice(0, 3);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

}
