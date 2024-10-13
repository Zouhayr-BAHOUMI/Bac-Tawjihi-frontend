import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recu } from 'src/app/interfaces/recu';
import { Router } from '@angular/router';
import { RecuService } from 'src/app/shared/services/recu.service';

@Component({
  selector: 'app-recu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recu.component.html',
  styleUrls: ['./recu.component.scss']
})
export class RecuComponent implements OnInit{

  recuDetails: Recu | null = null;

  constructor(private router: Router, private recuService : RecuService) {}

  ngOnInit(): void {
    this.recuDetails = this.recuService.getRecuData();
    if (this.recuDetails) {
      console.log('Receipt details retrieved in RecuComponent:', this.recuDetails);
    } else {
      console.error('No receipt data available in RecuComponent');
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.recuService.clearRecuData();
    this.router.navigate(['/user/user-dashboard']);
  }

}
