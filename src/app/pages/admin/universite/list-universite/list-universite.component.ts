import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Universite } from 'src/app/interfaces/universite';
import { UniversiteService } from 'src/app/shared/services/universite.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-universite',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-universite.component.html',
  styleUrls: ['./list-universite.component.scss']
})
export class ListUniversiteComponent implements OnInit {


  universites: Universite[] = [];
  universiteToDelete: Universite | null = null;
  showModal = false;

  constructor(private universiteService: UniversiteService) { }

  ngOnInit() {
    this.getUniversites();
  }


  public getUniversites(): void {
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

  openDeleteModal(universite: Universite): void {
    this.universiteToDelete = universite;
    this.showModal = true;
  }

  cancelDelete(): void {
    this.showModal = false;
    this.universiteToDelete = null;
  }

  confirmDelete(): void {
    if (this.universiteToDelete) {
      this.deleteEquipement(this.universiteToDelete.id);
    }
  }
  
  deleteEquipement(id: number): void {
    this.universiteService.deleteUniversite(id).subscribe(() => {
      this.getUniversites();
      this.cancelDelete();
    });
  }
}
