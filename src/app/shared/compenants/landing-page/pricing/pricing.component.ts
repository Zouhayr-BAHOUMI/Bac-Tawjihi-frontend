import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pack } from 'src/app/interfaces/pack';
import { PackService } from 'src/app/shared/services/pack.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit{

  packs: Pack[] = [];

  constructor(private packService: PackService) {}

  ngOnInit() {
    this.getPacks();
  }

  public getPacks(): void {
    this.packService.getPacksWithFilieres().subscribe(
      (response: Pack[]) => {
        console.log(response);
        this.packs = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

}
