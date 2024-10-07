import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackEtudiantInfoComponent } from './pack-etudiant-info.component';

describe('PackEtudiantInfoComponent', () => {
  let component: PackEtudiantInfoComponent;
  let fixture: ComponentFixture<PackEtudiantInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PackEtudiantInfoComponent]
    });
    fixture = TestBed.createComponent(PackEtudiantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
