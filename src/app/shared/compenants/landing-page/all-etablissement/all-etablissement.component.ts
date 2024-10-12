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
import { TypeEtablissement } from 'src/app/enums/type-etablissement';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

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

  selectedType: TypeEtablissement | '' = ''; 
  establissementTypes = Object.values(TypeEtablissement);

  searchQuery: string = '';
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private etablissementService: EtablissementService,
    private universiteService: UniversiteService
  ) { }

  ngOnInit() {
    this.getEtablissements();
    this.getUniversities();
    this.search();
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

  onTypeChange(): void {
    if (this.selectedType) {
      this.etablissementService.getEtablissementsByType(this.selectedType).subscribe(data => {
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

  search(): void {
    this.searchSubject.pipe(
      debounceTime(200),
      distinctUntilChanged() 
    ).subscribe(query => {
      if (query) {
        this.etablissementService.searchEtablissements(query).subscribe(data => {
          this.etablissements = data;
        });
      } else {
        this.getEtablissements(); 
      }
    });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
  }

}
