import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEtablissementComponent } from './all-etablissement.component';

describe('AllEtablissementComponent', () => {
  let component: AllEtablissementComponent;
  let fixture: ComponentFixture<AllEtablissementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AllEtablissementComponent]
    });
    fixture = TestBed.createComponent(AllEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
