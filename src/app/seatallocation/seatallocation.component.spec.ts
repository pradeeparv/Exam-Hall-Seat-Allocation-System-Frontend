import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatallocationComponent } from './seatallocation.component';

describe('SeatallocationComponent', () => {
  let component: SeatallocationComponent;
  let fixture: ComponentFixture<SeatallocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeatallocationComponent]
    });
    fixture = TestBed.createComponent(SeatallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
