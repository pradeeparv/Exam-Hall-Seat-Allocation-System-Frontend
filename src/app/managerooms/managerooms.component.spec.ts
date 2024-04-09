import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageroomsComponent } from './managerooms.component';

describe('ManageroomsComponent', () => {
  let component: ManageroomsComponent;
  let fixture: ComponentFixture<ManageroomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageroomsComponent]
    });
    fixture = TestBed.createComponent(ManageroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
