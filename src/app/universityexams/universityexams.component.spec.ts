import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityexamsComponent } from './universityexams.component';

describe('UniversityexamsComponent', () => {
  let component: UniversityexamsComponent;
  let fixture: ComponentFixture<UniversityexamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniversityexamsComponent]
    });
    fixture = TestBed.createComponent(UniversityexamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
