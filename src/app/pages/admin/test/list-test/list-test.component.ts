import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TestService } from 'src/app/shared/services/test.service';
import { Test } from 'src/app/interfaces/test';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-list-test',
  standalone: true,
  imports: [CommonModule,ButtonModule, CardModule, RouterModule, DialogModule],
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.scss']
})
export class ListTestComponent implements OnInit {

  tests: Test[] = [];
  testToDelete: Test | null = null;
  showModal = false;

  constructor(private testService: TestService) {}

  ngOnInit() {
    this.getTests();
  }

  public getTests(): void {
    this.testService.getTests().subscribe(
      (response: Test[]) => {
        console.log(response);
        this.tests = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  openDeleteModal(test: Test): void {
    this.testToDelete = test;
    this.showModal = true;
  }

  cancelDelete(): void {
    this.showModal = false;
    this.testToDelete = null;
  }

  confirmDelete(): void {
    if (this.testToDelete) {
      this.deleteTest(this.testToDelete.id);
    }
  }

  deleteTest(id: number): void {
    this.testService.deleteTest(id).subscribe(() => {
      this.getTests(); 
      this.cancelDelete(); 
    });
  }

}
