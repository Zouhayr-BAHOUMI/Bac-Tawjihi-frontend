import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEtablissementComponent } from './create-etablissement.component';

describe('CreateEtablissementComponent', () => {
  let component: CreateEtablissementComponent;
  let fixture: ComponentFixture<CreateEtablissementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateEtablissementComponent]
    });
    fixture = TestBed.createComponent(CreateEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
