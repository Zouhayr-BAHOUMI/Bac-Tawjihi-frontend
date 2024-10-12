import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Etablissement } from 'src/app/interfaces/etablissement';
import { EtablissementService } from 'src/app/shared/services/etablissement.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../../dashboard/footer/footer.component";

@Component({
  selector: 'app-etablissement-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './etablissement-details.component.html',
  styleUrls: ['./etablissement-details.component.scss']
})
export class EtablissementDetailsComponent implements OnInit{

  etablissement: Etablissement | null = null;


  constructor(
    private route: ActivatedRoute,
    private etablissementService: EtablissementService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.etablissementService.getHomeEtablissementById(+id).subscribe(
        (data) => {
          this.etablissement = data;
        },
        (error) => {
          console.error('Error fetching establishment details:', error);
        }
      );
    }
  }
}
