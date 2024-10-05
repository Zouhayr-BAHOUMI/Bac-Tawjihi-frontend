import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestComponent } from './edit-test.component';

describe('EditTestComponent', () => {
  let component: EditTestComponent;
  let fixture: ComponentFixture<EditTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditTestComponent]
    });
    fixture = TestBed.createComponent(EditTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
