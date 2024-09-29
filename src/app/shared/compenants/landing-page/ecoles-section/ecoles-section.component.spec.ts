import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcolesSectionComponent } from './ecoles-section.component';

describe('EcolesSectionComponent', () => {
  let component: EcolesSectionComponent;
  let fixture: ComponentFixture<EcolesSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EcolesSectionComponent]
    });
    fixture = TestBed.createComponent(EcolesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
