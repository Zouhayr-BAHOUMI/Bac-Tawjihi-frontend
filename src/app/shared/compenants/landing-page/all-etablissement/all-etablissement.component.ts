import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { Etablissement } from 'src/app/interfaces/etablissement';
import { EtablissementService } from 'src/app/shared/services/etablissement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MainFooterComponent } from "../main-footer/main-footer.component";
import { FooterComponent } from "../../dashboard/footer/footer.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-etablissement',
  standalone: true,
  imports: [CommonModule,RouterModule, HeaderComponent, MainFooterComponent, FooterComponent],
  templateUrl: './all-etablissement.component.html',
  styleUrls: ['./all-etablissement.component.scss']
})
export class AllEtablissementComponent implements OnInit{

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
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

}
