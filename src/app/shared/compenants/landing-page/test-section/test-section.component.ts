import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Test } from 'src/app/interfaces/test';
import { TestService } from 'src/app/shared/services/test.service';

@Component({
  selector: 'app-test-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-section.component.html',
  styleUrls: ['./test-section.component.scss']
})
export class TestSectionComponent {

  showPopup: boolean = false;
  randomTest: Test | null = null;

  constructor(private testService: TestService) {}

  startTest() {
    this.testService.getRandomTest().subscribe({
      next: (test: Test) => {
        this.randomTest = test;
        this.showPopup = true;
      },
      error: (err) => {
        console.error('Error fetching random test', err);
      }
    });
  }

  confirmTest() {
    if (this.randomTest) {
      this.testService.assignTestToEtudiant(this.randomTest.id).subscribe({
        next: () => {
          this.showPopup = false;
          console.log('Test assigned successfully');
        },
        error: (err) => {
          console.error('Error assigning test', err);
        }
      });
    }
  }

  closePopup() {
    this.showPopup = false;
  }

}
