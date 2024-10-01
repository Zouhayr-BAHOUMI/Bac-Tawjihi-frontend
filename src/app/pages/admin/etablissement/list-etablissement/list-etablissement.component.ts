import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Etablissement } from 'src/app/interfaces/etablissement';
import { EtablissementService } from 'src/app/shared/services/etablissement.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-etablissement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-etablissement.component.html',
  styleUrls: ['./list-etablissement.component.scss']
})
export class ListEtablissementComponent {

  etablissements: Etablissement[] = [];
  etablissementToDelete: Etablissement | null = null;
  showModal = false;

  constructor(private etablissementService: EtablissementService) { }

  ngOnInit() {
    this.getEtablissements();
  }

  public getEtablissements(): void {
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
}
