import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarraperComponent } from './warraper.component';

describe('WarraperComponent', () => {
  let component: WarraperComponent;
  let fixture: ComponentFixture<WarraperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WarraperComponent]
    });
    fixture = TestBed.createComponent(WarraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
