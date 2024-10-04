import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackService } from 'src/app/shared/services/pack.service';
import { Pack } from 'src/app/interfaces/pack';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-pack',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './list-pack.component.html',
  styleUrls: ['./list-pack.component.scss']
})
export class ListPackComponent {

  packs: Pack[] = [];
  packToDelete: Pack | null = null;
  showModal = false;

  constructor(private packService: PackService) {}

  ngOnInit() {
    this.getPacks();
  }

  public getPacks(): void {
    this.packService.getPacks().subscribe(
      (response: Pack[]) => {
        this.packs = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  openDeleteModal(pack: Pack): void {
    this.packToDelete = pack;
    this.showModal = true;
  }

  cancelDelete(): void {
    this.showModal = false;
    this.packToDelete = null;
  }

  confirmDelete(): void {
    if (this.packToDelete) {
      this.deletePack(this.packToDelete.id);
    }
  }

  deletePack(id: number): void {
    this.packService.deletePack(id).subscribe(() => {
      this.getPacks();
      this.cancelDelete();
    });
  }

}
