import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUniversiteComponent } from './create-universite.component';

describe('CreateUniversiteComponent', () => {
  let component: CreateUniversiteComponent;
  let fixture: ComponentFixture<CreateUniversiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateUniversiteComponent]
    });
    fixture = TestBed.createComponent(CreateUniversiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
