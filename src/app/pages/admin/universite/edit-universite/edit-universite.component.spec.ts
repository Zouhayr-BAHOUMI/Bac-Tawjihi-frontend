import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUniversiteComponent } from './edit-universite.component';

describe('EditUniversiteComponent', () => {
  let component: EditUniversiteComponent;
  let fixture: ComponentFixture<EditUniversiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditUniversiteComponent]
    });
    fixture = TestBed.createComponent(EditUniversiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
