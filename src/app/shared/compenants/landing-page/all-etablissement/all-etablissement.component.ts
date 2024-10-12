import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { Etablissement } from 'src/app/interfaces/etablissement';
import { EtablissementService } from 'src/app/shared/services/etablissement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MainFooterComponent } from "../main-footer/main-footer.component";
import { FooterComponent } from "../../dashboard/footer/footer.component";
import { RouterModule } from '@angular/router';
import { Universite } from 'src/app/interfaces/universite';
import { UniversiteService } from 'src/app/shared/services/universite.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-etablissement',
  standalone: true,
  imports: [CommonModule,RouterModule, HeaderComponent, MainFooterComponent, FooterComponent, FormsModule],
  templateUrl: './all-etablissement.component.html',
  styleUrls: ['./all-etablissement.component.scss']
})
export class AllEtablissementComponent implements OnInit{

  etablissements: Etablissement[] = [];
  universites: Universite[] = [];
  selectedUniversiteId: number | undefined;

  constructor(
    private etablissementService: EtablissementService,
    private universiteService: UniversiteService
  ) { }

  ngOnInit() {
    this.getEtablissements();
    this.getUniversities();
  }

  public getUniversities(): void {
    this.universiteService.getHomeUniversites().subscribe(
      (response: Universite[]) => {
        console.log(response);
        this.universites = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  onUniversiteChange(): void {
    if (this.selectedUniversiteId) {
      this.etablissementService.getHomeEtablissementsByUniversite(this.selectedUniversiteId).subscribe(data => {
        this.etablissements = data;
      });
    } else {
      this.getEtablissements();  
    }
  }

  public getEtablissements(): void {
    this.etablissementService.getHomeEtablissements().subscribe(
      (response: Etablissement[]) => {
        this.etablissements = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

}
