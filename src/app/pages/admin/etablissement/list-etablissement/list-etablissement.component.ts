import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Etablissement } from 'src/app/interfaces/etablissement';
import { EtablissementService } from 'src/app/shared/services/etablissement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Universite } from 'src/app/interfaces/universite';
import { UniversiteService } from 'src/app/shared/services/universite.service';

@Component({
  selector: 'app-list-etablissement',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './list-etablissement.component.html',
  styleUrls: ['./list-etablissement.component.scss']
})
export class ListEtablissementComponent {

  etablissements: Etablissement[] = [];
  universites: Universite[] = [];
  etablissementToDelete: Etablissement | null = null;
  showModal = false;
  selectedUniversiteId: number | undefined;

  constructor(
    private etablissementService: EtablissementService,
    private universiteService: UniversiteService
  ) { }

  ngOnInit() {
    this.getEtablissements();
    this.getUniversities();
  }

  public getEtablissements(): void {
    this.universiteService.getUniversites().subscribe(
      (response: Universite[]) => {
        console.log(response);
        this.universites = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public getUniversities(): void {
    this.etablissementService.getAllEtablissements().subscribe(
      (response: Etablissement[]) => {
        console.log(response);
        this.etablissements = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  onUniversiteChange(): void {
    if (this.selectedUniversiteId) {
      this.etablissementService.getEtablissementsByUniversite(this.selectedUniversiteId).subscribe(data => {
        this.etablissements = data;
      });
    } else {
      this.getEtablissements();  
    }
  }

  openDeleteModal(etablissement: Etablissement): void {
    this.etablissementToDelete = etablissement;
    this.showModal = true;
  }

  cancelDelete(): void {
    this.showModal = false;
    this.etablissementToDelete = null;
  }

  confirmDelete(): void {
    if (this.etablissementToDelete) {
      this.deleteEtablissement(this.etablissementToDelete.id);
    }
  }
  
  deleteEtablissement(id: number): void {
    this.etablissementService.deleteEtablissement(id).subscribe(() => {
      this.getEtablissements();
      this.cancelDelete();
    });
  }
}
