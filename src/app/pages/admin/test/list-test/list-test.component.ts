import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list-test',
  standalone: true,
  imports: [CommonModule,ButtonModule, CardModule],
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.scss']
})
export class ListTestComponent {

}
