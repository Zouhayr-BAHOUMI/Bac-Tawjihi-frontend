import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePackComponent } from './create-pack.component';

describe('CreatePackComponent', () => {
  let component: CreatePackComponent;
  let fixture: ComponentFixture<CreatePackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreatePackComponent]
    });
    fixture = TestBed.createComponent(CreatePackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
