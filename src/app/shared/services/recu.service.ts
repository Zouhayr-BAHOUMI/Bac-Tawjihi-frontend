import { Injectable } from '@angular/core';
import { Recu } from 'src/app/interfaces/recu';

@Injectable({
  providedIn: 'root'
})
export class RecuService {

  private recuData: Recu | null = null;

  setReceiptData(data: Recu) {
    this.recuData = data;
    console.log('Receipt data set in service:', this.recuData);
  }

  getRecuData(): Recu | null {
    return this.recuData;
  }

  clearRecuData() {
    this.recuData = null;
  }
}
